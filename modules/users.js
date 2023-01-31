'use strict';

const UserModel = require("../model/UserModel");

async function createUser(request, response, next) {
  try {
    let createdUser = await UserModel.create(request.body);
    response.status(200).send(createdUser);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

async function getUser(request, response, next) {
  try {
    let dbResult = await UserModel.find({});
    response.status(200).send(dbResult);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    let userId = request.params.id;
    let userData = request.body;
    let upDatedUsers = await UserModel.findByIdAndUpdate(userId, userData, { new: true, overwrite: true });
    response.status(200).send(upDatedUsers);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

async function deleteUser(request, response, next) {
  try {
    let userId = request.params.id;
    await UserModel.findByIdAndDelete(userId);
    let dbResult = await UserModel.find({});
    response.status(200).send('User Deleted');

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

module.exports = { createUser, getUser, updateUser, deleteUser };
