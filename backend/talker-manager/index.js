const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Importando os Controllers
const controllers = require('./controllers');

// Importando Middlewares
const middleware = require('./middleware');

// Validações
const loginValidations = [
  middleware.validateEmail,
  middleware.validatePassword,
];

const postTalkValidations = [
  middleware.validateToken,
  middleware.validateName,
  middleware.validateAge,
  middleware.validateTalk,
  middleware.validateDate,
  middleware.validateRate,
];

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 1
app.get('/talker', controllers.listTalkers);

// REQUISITO 2
app.get('/talker/:id', controllers.talkerById);

// REQUISITO 3
app.post('/login', loginValidations, controllers.generateToken);

// REQUISITO 4
app.post('/talker', postTalkValidations, controllers.postTalker);

// REQUISITO 5
app.put('/talker/:id', postTalkValidations, controllers.editTalker);

// REQUISITO 6
app.delete('/talker/:id', middleware.validateToken, controllers.deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});

// app.use(middleware.errorHandler);