require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());

const productRoute = require('./router/products');
const saleRoute = require('./router/sales');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// REQUISITO 2
app.use('/products', productRoute);
app.use('/sales', saleRoute);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
