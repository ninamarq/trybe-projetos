import express from 'express';

import ProductsRouter from './routes/products';

import UsersRouter from './routes/users';

import OrdersRouter from './routes/orders';

const app = express();

app.use(express.json());

app.use(ProductsRouter);

app.use(UsersRouter);

app.use(OrdersRouter);

export default app;
