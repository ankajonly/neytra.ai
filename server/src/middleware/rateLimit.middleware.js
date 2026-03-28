import { RateLimiterMemory } from 'rate-limiter-flexible';

function createRateLimiter({ points, duration, message }) {
  const limiter = new RateLimiterMemory({ points, duration });

  return async (req, res, next) => {
    try {
      await limiter.consume(req.ip);
      next();
    } catch (_error) {
      res.status(429).json({
        success: false,
        message,
      });
    }
  };
}

export const authRateLimiter = createRateLimiter({
  points: 10,
  duration: 60,
  message: 'Too many authentication attempts. Please try again in a minute.',
});

export const contactRateLimiter = createRateLimiter({
  points: 8,
  duration: 60,
  message: 'Too many inquiries from this address. Please try again shortly.',
});