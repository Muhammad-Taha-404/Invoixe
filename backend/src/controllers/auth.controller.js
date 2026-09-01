import { signupSchema } from '#validations/auth.validations.js';
import logger from '#config/logger.js';
import { formatValidationErrors } from '#utils/format.js';
import { createUser, signIn } from '#services/auth.service.js';
import { jwtToken } from '#utils/jwttoken.js';
import { cookies } from '#utils/cookies.js';

export const signup = async (req, res, next) => {
  try {
    // Validate the input
    const validatedData = await signupSchema.safeParse(req.body);

    if (!validatedData.success) {
      logger.error(
        'Validation error during signup:',
        formatValidationErrors(validatedData.error)
      );
      return res
        .status(400)
        .json({
          error: 'Invalid input data',
          details: formatValidationErrors(validatedData.error),
        });
    }

    const { name, email, password, role } = validatedData.data;

    const newUser = await createUser({ name, email, password, role });
    const token = jwtToken.sign({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
    cookies.setCookie(res, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info(`User ${email} signed up successfully with role ${role}`);
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    logger.error('Error during signup:', error);

    if (error.name === 'User with this email already exists') {
      return res
        .status(409)
        .json({ error: 'User with this email already exists' });
    }

    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signIn({ email, password });
    const token = jwtToken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    cookies.setCookie(res, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info(`User ${email} signed in successfully`);
    res.status(201).json({
      message: 'User signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Error during signin:', error);

    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    if (error.message === 'Invalid password') {
      return res.status(401).json({ error: 'Invalid password' });
    }

    next(error);
  }
};

export const signOut = (req, res) => {
  try {
    cookies.clearCookie(res, 'token');
    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    logger.error('Error during signout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
