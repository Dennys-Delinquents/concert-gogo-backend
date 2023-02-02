'use strict';


const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: false },
  location: { type: String, required: false },
  searchHistory: { type: Array, required: false },
  events: { type: Array, required: false },
  isAdmin: { type: Boolean, required: false }
  
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;