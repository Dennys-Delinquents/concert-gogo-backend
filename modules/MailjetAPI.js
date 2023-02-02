'use strict';
require('dotenv').config();

async function sendEmail(request, response, next) {
  console.log('trying to send');

  const Mailjet = require('node-mailjet');
  const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_PUBLIC_KEY,
    process.env.MAILJET_API_PRIVATE_KEY,
  );

  let userEmail = request.query.userEmail
  let userName = request.query.userName

  console.log(userEmail);
  console.log(userName);

  const email = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'concertgogo.felspring@gmail.com',
            Name: 'Concert Gogo',
          },
          To: [
            {
              Email: userEmail,
              Name: userName,
            }
          ],
          Subject: 'Welcome to Concert GoGo!',
          TextPart: 'Welcome to Concert GoGo!',
          HTMLPart: '',
        }
      ]
    })

  await email
    .then((result) => {
      console.log(result.body)
      response.status(200).send('Email sent');
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
}

module.exports = { sendEmail };
