import { signupSchema, signinSchema } from '#validations/auth.validations.js';
import logger from '#config/logger.js';
import { formatValidationErrors } from '#utils/format.js';
import { createUser, signIn } from '#services/auth.service.js';
import { jwtToken } from '#utils/jwttoken.js';
import { cookies } from '#utils/cookies.js';
import { db } from '#config/database.js';
import crypto from 'crypto';
import fetch from 'node-fetch';

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

    const { name, email, password } = validatedData.data;

    const newUser = await createUser({ name, email, password });
    const token = jwtToken.sign({
      id: newUser.id,
      email: newUser.email,
      // role: newUser.role,
    });
    cookies.setCookie(res, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info(`User ${email} signed up successfully`);
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
    const validatedData = await signinSchema.safeParse(req.body);
    if (!validatedData.success) {
      logger.error(
        'Validation error during signin:',
        formatValidationErrors(validatedData.error)
      );
      return res
        .status(400)
        .json({
          error: 'Invalid input data',
          details: formatValidationErrors(validatedData.error),
        });
    }
    const { email, password } = validatedData.data;
    const user = await signIn({ email, password });
    const token = jwtToken.sign({
      id: user.id,
      email: user.email,
      // role: user.role,
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


export const gitHubLogin = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
  res.redirect(githubAuthUrl);
};

export const gitHubCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }

    const info = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`);
    const data = await info.json();
    if (!data.access_token) {
      return res.status(400).json({ error: 'Failed to retrieve access token' });
    }

    const userInfoResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${data.access_token}`,
        Accept: 'application/json',
      },
    });
    const userInfo = await userInfoResponse.json();
    const userId = await db.transaction(async (trx) => {
      const [existingUser] = await trx.select().from('users').where({ email: userInfo.email });
      let userId= existingUser?.id;
      if (!userId){
        const [newUser] = await trx('users').insert({
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.avatar_url,
          isVerified: 'true',
        }).returning();
        userId = newUser.id;
      }

      const [existingAccount] = await trx.select().from('accounts').where({ provider: 'github', providerAccountId: userInfo.id });
      if (!existingAccount) {
        await trx('accounts').insert({
          userId,
          type: 'oauth',
          provider: 'github',
          providerAccountId: userInfo.id,
          accessToken: data.access_token,
        });
        return userId;
    
      }});

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await db.insert({
      token: sessionToken,
      userId,
      expiresAt,
    }).into('sessions');
  
    res.cookie('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: expiresAt,
    });
  
    return res.redirect('http://localhost:4000/pricing');  
  } catch (error) {
    logger.error('Error during GitHub OAuth callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const googleLogin = (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
  res.redirect(googleAuthUrl);
};

export const googleCallback = async (req, res) => {
  try{
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }
  
    const info = await fetch(`https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`);
    const data = await info.json();
    if (!data.access_token) {
      return res.status(400).json({ error: 'Failed to retrieve access token' });
    }

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        Accept: 'application/json',
      },
    });
    const userInfo = await userInfoResponse.json();
    const userId = await db.transaction(async (trx) => {
      const [existingUser] = await trx.select().from('users').where({ email: userInfo.email });
      let userId= existingUser?.id;
      if (!userId){
        const [newUser] = await trx('users').insert({
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.picture,
          isVerified: 'true',
        }).returning();
        userId = newUser.id;
      }

      const [existingAccount] = await trx.select().from('accounts').where({ provider: 'google', providerAccountId: userInfo.id });
      if (!existingAccount) {
        await trx('accounts').insert({
          userId,
          type: 'oauth',
          provider: 'google',
          providerAccountId: userInfo.id,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
          tokenType: data.token_type,
        });
        return userId;
    
      }});

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await db.insert({
      token: sessionToken,
      userId,
      expiresAt,
    }).into('sessions');
  
    res.cookie('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: expiresAt,
    });
  
    return res.redirect('http://localhost:4000/pricing');
  } catch (error) {
    logger.error('Error during Google OAuth callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};