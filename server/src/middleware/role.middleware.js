export function requireRole(...allowed) {
  return (req, _res, next) => {
    const role = req.user?.role;
    if (!role || !allowed.includes(role)) {
      return next({ statusCode: 403, message: 'Insufficient permissions.' });
    }

    return next();
  };
}
