'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const users = require('./modules/users');
const events = require('./modules/events');
const UserModel = require('./model/UserModel');
const getEvents = require('./modules/events');

// *** BRING IN MONGOOSE ***
const mongoose = require('mongoose');
const { request } = require('http');

// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
mongoose.connect(process.env.DB_URL);

//mongoose status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// *******************************

const app = express();

//middleware
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (request, response) => response.status(200).send('Welcome!'));


// **** User DB ENDPOINT
app.post('/users', (request, response, next) => users.createUser(request, response, next));
app.get('/users', (request, response, next) => users.getUser(request, response, next));
app.put('/users/:id', (request, response, next) => users.updateUser(request, response, next));
app.delete('/users/:id', (request, response, next) => users.deleteUser(request, response, next));

app.get('/user/:email', (request, response, next) => users.getOneUser(request, response, next));

//----- TicketMaster API Endpoint
app.get('/events', getEvents);

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
