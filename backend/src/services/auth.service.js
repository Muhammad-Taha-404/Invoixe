import bcrypt from 'bcrypt';
import logger from '#config/logger.js';
import { users } from '#models/users.model.js';
import { db } from '#config/database.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

const hashPassword = async password => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    logger.error('Error hashing password:', error);
    return null;
  }
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export const createUser = async ({ name, email, password }) => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existingUser.length > 0) {
      logger.error(`User with email ${email} already exists`);
      return null;
    }

    const token = crypto.randomUUID();
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    const hashedPassword = await hashPassword(password);
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password_hash: hashedPassword,
        verificationToken: token,
        verificationTokenExpires: tokenExpires,
        isVerified: 'false',
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        isVerified: users.isVerified,
        verificationToken: users.verificationToken,
        verificationTokenExpires: users.verificationTokenExpires,
      });

    return newUser;
  } catch (error) {
    logger.error('Error creating user:', error);
    return null;
  }
};

export const getUserByEmail = async email => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user.length === 0) {
      logger.error(`User with email ${email} not found`);
      return null;
    }
    return user[0];
  } catch (error) {
    logger.error('Error fetching user by email:', error);
    return null;
  }
};

export const getUserById = async id => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (user.length === 0) {
      logger.error(`User with id ${id} not found`);
      return null;
    }
    return user[0];
  } catch (error) {
    logger.error('Error fetching user by id:', error);
    return null;
  }
};

export const signIn = async ({ email, password }) => {
  const user = await getUserByEmail(email);
  if (!user) {
    logger.error('User not found for email:', email);
    return null;
  }
  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) {
    logger.error('Invalid password for user with email:', email);
    return null;
  }
  return user;
};
