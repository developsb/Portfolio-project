function checkAdminKey(req, res, next) {
  const providedKey = req.headers['x-admin-key'];

  if (providedKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized: invalid admin key' });
  }

  next();
}

module.exports = checkAdminKey;
