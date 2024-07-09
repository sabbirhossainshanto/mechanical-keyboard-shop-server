import { orderRoutes } from '../modules/order/order.route';
import { productRoutes } from '../modules/product/product.route';

export const moduleRoutes = [
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];
