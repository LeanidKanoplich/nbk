const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Для админа разрешаем всё
    if (req.user.role === 'admin') {
      return next();
    }

    // Здесь можно добавить проверку конкретных прав
    const userPermissions = req.user.permissions || [];
    if (userPermissions.includes(permission)) {
      return next();
    }

    return res.status(403).json({ error: 'Permission denied' });
  };
};

module.exports = {
  checkPermission
}; 