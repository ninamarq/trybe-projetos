import { Router } from 'express';
import OrdersController from '../controllers/orders';

const OrdersRouter = Router();

const ordersControllers = new OrdersController();

OrdersRouter.get('/orders', ordersControllers.getAll);

export default OrdersRouter;