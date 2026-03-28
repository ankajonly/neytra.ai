export function notFoundHandler(req, _res, next) {
  next({ statusCode: 404, message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  void _next;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error.',
    details: error.details || null,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
}