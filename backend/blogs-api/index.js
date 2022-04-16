const express = require('express');
const userRoute = require('./router/users');
const loginRoute = require('./router/login');
const categoryRoute = require('./router/categories');
const blogPostRoute = require('./router/blogPost');

const app = express();

app.use(express.json());

// Routers
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categoryRoute);
app.use('/post', blogPostRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
