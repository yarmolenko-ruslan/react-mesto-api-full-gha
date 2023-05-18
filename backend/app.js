const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { celebrate, Joi, errors } = require('celebrate');
const { PORT, MONGOOSE_URL } = require('./tokenValue');

const { NOT_FOUND_ERROR } = require('./errors/notFoundError');
const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { cors } = require('./moddlewares/cors.js');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/
      ),
    }),
  }),
  createUser
);

app.use(auth);
app.use(router);

app.use((req, res, next) => {
  next(new NOT_FOUND_ERROR('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

async function main() {
  await mongoose.connect(MONGOOSE_URL);
  console.log('Сервер подключен к базе данных');

  await app.listen(PORT);
  console.log(`Сервер слушает запросы на ${PORT} порту...`);
}

main();
