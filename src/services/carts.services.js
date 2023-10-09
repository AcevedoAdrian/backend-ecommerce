import CartRepository from '../repositories/cart.repository.js';
import { Cart } from '../dao/factory/carts.factory.js';

export const CartService = new CartRepository(new Cart());

// CALCULAR PRECIO TOTAL PRODUCT(precio*stock)
export const cartCalculateTotal = async (carts) => {
  console.log(carts);
  let cartTotal = 0;
  try {
    for (const cart of carts) {
      // const product = await ProductService.getById(cart.product);
      // if (!product) {
      //   throw new Error(`El producto no existe : ${cart.product}`);
      // }
      cartTotal += cart.product.price * cart.quantity;
    }
  } catch (error) {
    throw new Error(error);
  }
  return cartTotal;
};
