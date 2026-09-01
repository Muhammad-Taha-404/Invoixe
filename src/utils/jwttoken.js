import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Replace with your own secret key
const JWT_EXPIRATION = '1d';

export const jwtToken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    } catch (err) {
      logger.error('Error signing token', { cause: err });
      throw new Error('Error signing token', { cause: err });
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      logger.error('Error verifying token', { cause: err });
      throw new Error('Invalid token', { cause: err });
    }
  },
};
