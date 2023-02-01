'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const UserModel = require('./model/UserModel.js');

async function seed() {

    await UserModel.create({
        name: 'Mike Shen',
        email: 'michael.m.shen@gmail.com',
        isAdmin: false 
    });


    await UserModel.create({
        name: 'Steve Gant',
        email: 'sgant39@gmail.com',
        isAdmin: true
    });

    await UserModel.create({
        name: 'Stephanie Simpson',
        email: 'steph@aol.com',
        isAdmin: false
    });


    mongoose.disconnect();
}
// another comment
seed();