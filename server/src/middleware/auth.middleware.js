import { getUserById, sanitizeUser } from '../services/auth.service.js';
import { verifyToken } from '../utils/jwt.js';

export async function protect(req, _res, next) {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.neytr_token;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : cookieToken;

    if (!token) {
      return next({ statusCode: 401, message: 'Authentication required.' });
    }

    const payload = verifyToken(token);
    const user = await getUserById(payload.sub);

    req.user = sanitizeUser(user);
    return next();
  } catch (_error) {
    return next({ statusCode: 401, message: 'Invalid or expired token.' });
  }
}