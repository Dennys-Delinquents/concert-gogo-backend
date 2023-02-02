'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const UserModel = require('./model/UserModel.js');

async function seed() {
    await UserModel.create({
        name: 'John Chavez',
        email: 'jrc2855@gmail.com',
        location: 'FL',
        isAdmin: true 
    });

    await UserModel.create({
        name: 'Mike Shen',
        email: 'michael.m.shen@gmail.com',
        location: 'WA',
        isAdmin: true 
    });

    await UserModel.create({
        name: 'Steve Gant',
        email: 'sgant39@gmail.com',
        location: 'WA',
        isAdmin: true
    });

    await UserModel.create({
        name: 'Ty Aponte',
        email: 'tyjamesramblings@gmail.com',
        location: 'CA',
        isAdmin: true
    });

    await UserModel.create({
        name: 'Audrey Patterson',
        email: 'audrey.patterson31@gmail.com',
        searchHistory: ['backstreet boys', 'n sync', 'boy bands', 'k pop', '90s groups'],
        isAdmin: false
    });


    mongoose.disconnect();
}
// another comment
seed();