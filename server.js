'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const users = require('./modules/users');
const events = require('./modules/events');
const UserModel = require('./model/UserModel');

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

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// **** User DB ENDPOINT
app.post('/users', (request, response) => {
  users.createUser(request, response);
});

app.get('/users', (request, response) => {
  users.getUser(request, response);
});

app.put('/users', (request, response) => {
  users.updateUser(request, response);
});

app.delete('/users', (request, response) => {
  users.deleteUser(request, response);
});



//----- Ticket Master Data Retrieval Endpoint
app.get('/tickets', async (request, response, next) => {
  try {
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=${API_KEY}`
    let ticketsURL = await axios.get(url);
    console.log(ticketsURL.data);
    response.status(200).send(ticketsURL.data);

  } catch (error) {
    console.log(error)
  }
});

//----- Location Search Endpoint
app.get('/location', async (request, response, next) => {
  try {
    let stateCode = 'FL';
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&stateCode=${stateCode}&apikey=${API_KEY}`
    let ticketsURL = await axios.get(url);
    console.log(ticketsURL.data);
    response.status(200).send(ticketsURL.data);

  } catch (error) {
    console.log(error)
  }
});

//----- Genre Search Endpoint
app.get('/genre', async (request, response, next) => {
  try {
    let genre = 'punk';
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=${genre}&apikey=${API_KEY}`
    let ticketsURL = await axios.get(url);
    console.log(ticketsURL.data);
    response.status(200).send(ticketsURL.data);
  } catch (error) {
    console.log(error)
  }
});

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
