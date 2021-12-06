const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: '',
  },
  director: {
    type: String,
    required: true,
    default: '',
  },
  duration: {
    type: String,
    required: true,
    default: '',
  },
  year: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  image: {
    type: String,
    required: true,
    validate: isURL,
    default: '',
  },
  trailer: {
    type: String,
    required: true,
    validate: isURL,
    default: '',
  },
  thumbnail: {
    type: String,
    required: true,
    validate: isURL,
    default: '',
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    default: '',
  },
  nameEN: {
    type: String,
    required: true,
    default: '',
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
