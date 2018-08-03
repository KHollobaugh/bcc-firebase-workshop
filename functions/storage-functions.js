const vision = require('@google-cloud/vision');
const exec = require('child-process-promise').exec;
const gcs = require('@google-cloud/storage')();
const admin = require('firebase-admin');
const fs = require('fs');
const visionClient = new vision.ImageAnnotatorClient();

/**
 * Use the Google Cloud Vision API to determine whether a user profile image needs to be moderated.
 * @param {*} object google cloud storage object to moderate
 */
module.exports.moderateUserProfileImage = function(object) {
    // Exit if this is a deletion or a deploy event.
    if (object.resourceState === 'not_exists') {
        return console.log('This is a deletion event.');
    } else if (!object.name) {
        return console.log('This is a deploy event.');
    }

    const userId = object.name.split('/')[1];
    console.log(userId);
    const userDocRef = admin.firestore().collection('users').doc(userId);
    return userDocRef.get().then(doc => {
        const user = doc.data();
        // The image has already been moderated.
        if (user.locked === true) {
            console.log('already moderated!');
            return;
        }

        // Check the image content using the Cloud Vision API.
        return visionClient.safeSearchDetection(`gs://${object.bucket}/${object.name}`);
    }).then((results) => {
        if (!results) {
            return;
        }
        const detections = results[0].safeSearchAnnotation;
        if (detections.adult || detections.violence) {
            console.log('The image', object.name, 'has been detected as inappropriate.');
            return blurImage(object, userDocRef);
        } else {
            console.log('The image', object.name, ' has been detected as OK.');
            return null;
        }
    });
}

/**
 * Helper function to blur the given image located in the given bucket using ImageMagick
 * and lock the given user
 */
function blurImage(object, userDocRef) {
    const filePath = object.name;
    const bucket = gcs.bucket(object.bucket);
    const fileName = filePath.split('/').pop();
    const tempLocalFile = `/tmp/${fileName}`;

    // Download file from bucket.
    return bucket.file(filePath).download({ destination: tempLocalFile }).then(() => {
        console.log('Image has been downloaded to', tempLocalFile);
        // Blur the image using ImageMagick.
        return exec(`convert ${tempLocalFile} -channel RGBA -blur 0x24 ${tempLocalFile}`);
    })
    .then(() => {
        console.log('Image has been blurred');
        // Uploading the Blurred image back into the bucket.
        return bucket.upload(tempLocalFile, { destination: filePath });
    })
    .then(() => {
        console.log('Blurred image has been uploaded to', filePath);
        // Indicate that the message has been moderated.
        return userDocRef.update({ locked: true});
    })
    .then(() => {
        console.log('Marked the image as moderated in the database.');
        return fs.unlinkSync(tempLocalFile);
    });
}
