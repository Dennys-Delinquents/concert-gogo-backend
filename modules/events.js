'use strict';
const axios = require('axios');

//! Still a work in Progress. Need to get stateCode replaced in url
async function getEvents(request, response, next) {
  try {
    // let location = request.query.location
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&stateCode=WA&apikey=${process.env.API_KEY}`
    let locationDataFromAxios = await axios.get(url)
    let parsedLocationData = locationDataFromAxios.data._embedded.events;
    console.log(parsedLocationData);
    let locationData = parsedLocationData.map(eventData => new Events(eventData));


    response.status(200).send(locationData);


  } catch (error) {
    console.log(error.message)
  }

}
class Events {
  constructor(eventsObj) {
    this.event = eventsObj.name;
    this.url = eventsObj.url;
    this.image = eventsObj.images[0].url;
    this.dateTime = eventsObj.dates.start.dateTime;    
  }
}

module.exports = getEvents;