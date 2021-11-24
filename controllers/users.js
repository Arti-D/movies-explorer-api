const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'REALLY_SECRET' } = process.env;
const User = require('../models/user');

// ОШИБКИ
const NotFoundError = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ConflictingRequestErr = require('../errors/ConflictingRequestErr');

const successCode = require('../errors/status-codes/success-codes');

// FUNCTIONS
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => {
      User.findById(newUser._id)
        .then((user) => res.status(successCode.SUCCESS_CODE).send({ data: user }))
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        next(new ConflictingRequestErr('Такой пользователь уже существует'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Такого пользователя не существует'));
      }
      res.status(successCode.SUCCESS_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      res.status(successCode.SUCCESS_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else if (err.name === 'MongoError' || err.code === 11000) {
        next(new ConflictingRequestErr('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 7,
      })
        .send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError' || err.name === 'BadRequest') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const logOut = (req, res) => {
  res.clearCookie('jwt').end();
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getCurrentUser,
  logOut,
};
