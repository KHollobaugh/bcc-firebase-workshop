const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
// Create an express app and allow cors requests
const expressApp = express();
expressApp.use(cors({ origin: true }));
/**
 * Create a post endpoint and update the views field on the posted breweryId
 */
expressApp.post('/brewery-viewed', (request, response) => {

});

module.exports.expressApp = expressApp;
