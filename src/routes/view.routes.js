import { Router } from 'express';
import { authorization, privateRoutes, publicRoutes } from '../middleware/authorization.middleware.js';
import UserDTO from '../dto/user.dto.js';

import {
  viewAllProductsController,
  viewRealTimeAllProductsController,
  viewProductByIdController,
  viewCartByIDController,
  getProductMockController,
  createProductMockController,
  getLoggerController,
  getTicketViewController
} from '../controllers/view.controller.js';

const router = Router();

router.get('/products', authorization(['USER', 'ADMIN', 'PREMIUM']), viewAllProductsController);
router.get('/product/:pid', authorization(['USER', 'ADMIN', 'PREMIUM']), viewProductByIdController);
router.get('/realtimeproducts', authorization(['ADMIN', 'PREMIUM']), viewRealTimeAllProductsController);
router.get('/carts/:cid', authorization(['USER', 'ADMIN']), viewCartByIDController);
router.get('/ticket/:tid', authorization(['USER', 'ADMIN']), getTicketViewController);
router.get('/mockingproducts', getProductMockController);
router.post('/mockingproducts', createProductMockController);
router.get('/loggerTest', getLoggerController);

router.get('/', privateRoutes, (req, res) => {
  res.render('sessions/login');
});
router.get('/register', privateRoutes, async (req, res) => {
  res.render('sessions/register');
});

router.get('/reset-password', (req, res) => {
  res.render('sessions/forget-password');
});

router.get('/reset-password/:token', (req, res) => {
  res.redirect(`/api/sessions/verify-token/${req.params.token}`);
});

router.get('/profile', publicRoutes, (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('sessions/profile', userDTO);
});

export default router;
