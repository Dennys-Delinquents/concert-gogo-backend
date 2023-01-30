'use strict';

const UserModel = require("../model/UserModel");

async function createUser(request, response) {
  let createdUser = await UserModel.create(request.body);

  response.status(200).send(createdUser);
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

async function updateUser(request, response) {
  let userId = request.params.id;
  let userData = request.body;
  let upDatedUsers = await UserModel.findByIdAndUpdate(userId, userData, { new: true, overwrite: true });
  
  response.status(200).send(upDatedUsers);
}
async function deleteUser(request, response) {
  let userId = request.params.id;
  await  UserModel.findByIdAndDelete(userId);
  let dbResult = await UserModel.find({});

  response.status(200).send('User Deleted');
}

module.exports = {createUser, getUser, updateUser, deleteUser};
