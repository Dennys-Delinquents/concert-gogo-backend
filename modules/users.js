'use strict';

async function createUser(request, response) {
  response.status(200).send('User Created');
}
async function getUser(request, response) {
  response.status(200).send('User Grabbed');
}
async function updateUser(request, response) {
  response.status(200).send('User Updated');
}
async function deleteUser(request, response) {
  response.status(200).send('User Deleted');
}

module.exports = {createUser, getUser, updateUser, deleteUser};
