const vision = require('@google-cloud/vision');
const exec = require('child-process-promise').exec;
const gcs = require('@google-cloud/storage')();
const admin = require('firebase-admin');
const visionClient = new vision.ImageAnnotatorClient();

/**
 * Use the Google Cloud Vision API to determine whether a user profile image needs to be moderated.
 * @param {*} object google cloud storage object to moderate
 */
module.exports.moderateUserProfileImage = function(object) {

}

/**
 * Helper function to blur the given image located in the given bucket using ImageMagick
 * and lock the given user
 */
function blurImage(object, userRef) {

}
