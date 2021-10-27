const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userControllers = require('./controllers/users');
const auth = require('./middlewares/auth');

// РОУТЫ
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// ПЕРЕМЕННЫЕ ОШИБОК
const errorsHandler = require('./errors/errorsHandler');

// ПРИЛОЖЕНИЕ
const app = express();
const { PORT = 3002 } = process.env;

// ПОДКЛЮЧЕНИЕ К БД
mongoose
  .connect('mongodb://localhost:27017/dpmoviesdb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: [
      // сайты
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

app.post('/signin', userControllers.login);
app.post('/signup', userControllers.createUser);
app.use(auth);
app.head('/logOut', userControllers.logOut);
app.use('/users', routerUsers);
app.use('/movies', routerMovies);

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
