import { cartRoutes } from '../modules/cart/cart.route';
import { orderRoutes } from '../modules/order/order.route';
import { productRoutes } from '../modules/product/product.route';

export const moduleRoutes = [
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/carts',
    route: cartRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];
