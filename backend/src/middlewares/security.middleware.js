import aj from '#config/arcjet.js';
import { slidingWindow } from '@arcjet/node';
import logger from '#config/logger.js';

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const role = req.user?.role || 'guest';

    let limit;
    let message;
    const userId = req.user?.id;

    switch (role) {
      case 'admin':
        limit = 300;
        message = 'Admin rate limit exceeded. Please try again later.';
        break;
      case 'user':
        limit = 100;
        message = 'User rate limit exceeded. Please try again later.';
        break;
      case 'guest':
        limit = 60;
        message = 'Guest rate limit exceeded. Please try again later.';
        break;
      default:
        limit = 20;
        message = 'Guest rate limit exceeded. Please try again later.';
    }

    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE',
        interval: '1m',
        max: limit,
        message,
        characteristics: userId ? ['userId'] : ['ip.src'],
        name: `${role}-sliding-window`,
      })
    );

    const decision = await client.protect(req, { userId: userId || req.ip });

    if (decision.isDenied) {
      if (decision.reason.isBot()) {
        logger.warn('Bot detected or request denied by Arcjet', {
          reason: decision.reason,
          ip: req.ip,
          path: req.path,
          userAgent: req.get('User-Agent'),
        });
        return res
          .status(403)
          .json({ error: decision.reason.message || 'Bot Detected' });
      }

      if (decision.reason.isShield()) {
        logger.warn('Shield triggered or request denied by Arcjet', {
          reason: decision.reason,
          ip: req.ip,
          path: req.path,
          userAgent: req.get('User-Agent'),
          method: req.method,
        });
        return res
          .status(403)
          .json({ error: decision.reason.message || 'Shield triggered' });
      }

      if (decision.reason.isRateLimit()) {
        logger.warn('Rate limit exceeded or request denied by Arcjet', {
          reason: decision.reason,
          ip: req.ip,
          path: req.path,
          userAgent: req.get('User-Agent'),
        });
        return res
          .status(429)
          .json({ error: decision.reason.message || 'Rate limit exceeded' });
      }
    }

    next();
  } catch (error) {
    console.error('Error in Arcjet middleware:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error', errorDetails: error.message });
  }
};
