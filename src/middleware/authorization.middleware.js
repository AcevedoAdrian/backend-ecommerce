import logger from '../services/logger.js';

export const authorization = (roles) => {
  return async (req, res, next) => {
    roles.forEach(role => {
      if (role === 'PUBLIC') return next();
    });
    logger.info(req.user);
    if (!req.user) {
      return res.status(401).render('errors/errorPage', {
        status: 'error',
        message: 'Usuario no autoziado'
      });
      // return res.status(401).send({ status: 'error', message: 'No autoziado' });
    }
    if (!roles.includes(req.user.role.toUpperCase())) {
      return res.status(403).render('errors/errorPage', {
        status: 'error',
        message: 'Usuario sin permiso'
      });
    }

    next();
  };
};
