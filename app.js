const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

// РОУТЫ
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// ПЕРЕМЕННЫЕ ОШИБОК
const errorsHandler = require('./errors/errorsHandler');
const NotFoundErr = require('./errors/NotFoundErr');

// ПРИЛОЖЕНИЕ
const app = express();
const { PORT = 3007 } = process.env;

// ПОДКЛЮЧЕНИЕ К БД
const { BD_ADDRESS = 'localhost:27017/dpmoviesdb' } = process.env;
mongoose
  .connect(`mongodb://${BD_ADDRESS}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// ЛОГГЕР
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сейчас все сломается (');
  }, 0);
});

app.use(router);
app.use((req, res, next) => {
  next(new NotFoundErr('Такой страницы не существует'));
});

app.use((req, res, next) => {
  next(new Error('page is not found'));
});

// ЛОГГЕР
app.use(errorLogger);

// ОБРАБОТКА ОШИБОК
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
