const nodemailer = require('nodemailer');
const defaultImagePath = '../../assets/img/no-image.png';
const admin = require('firebase-admin');
const functions = require('firebase-functions');

 /**
  * Function responds to the first sign on event of a user through any method
  * the trigger returns a Firebase User see the following for reference
  * https://firebase.google.com/docs/reference/js/firebase.User
  */
module.exports.newUser = function(user, context) {
    console.log(user);
    // Create a user in Firestore so we can associate data with them
    const newUser = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        createdOn: user.metadata.creationTime,
        profileImageUrl: defaultImagePath,
        admin: false,
        locked: false
    };
    console.log('Time to welcome our new user!');
    console.log(newUser);

    // Save the user and send a welcome email. Or log out the error
    return admin.firestore().collection('/users/').doc(user.uid).set(newUser).then(() => {
        console.log('Successfully saved user to firestore');
        return sendWelcomeEmail(user.email);
    }).catch(e => {
        console.log(e);
        console.log('There was an error sending welcome email to ' + user.email);
    });
}

/**
 * Helper function to send a welcome email using nodemailer, see the following for reference
 * https://nodemailer.com
 * Note that this library is NOT tied to firebase, it is just
 * one (free) option for sending emails using node that we chose to use
 */
function sendWelcomeEmail(email) {
    console.log('sending welcome email');
    const firebaseConfig = functions.config();
    console.log(firebaseConfig);
    // These are set locally using the firebase cli tools
    // firebase functions:config:set gmail.email=firebase.workshop.tester@gmail.com
    // firebase functions:config:set gmail.password=password
    // Once they are set, deploying functions (see above) will set the config values on the functions server
    const gmailEmail = firebaseConfig.gmail.email;
    const gmailPassword = firebaseConfig.gmail.password;

    const mailOptions = {
      from: gmailEmail,
      to: email,
    };

    mailOptions.subject = 'Welcome New User!';
    mailOptions.text = 'Welcome! We hope that you enjoy learning about Firebase.';
    // Can also add HTML
    // mailOptions.html = '<div>Welcome! We hope that you enjoy learning about Firebase.</div>';

    const mailTransport = getTransporter(gmailEmail, gmailPassword, 'gmail');

    return mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        return console.log('New welcome email sent to: %s', email);
    });
}

/**
 * Helper function to create a nodemailer transporter with the given email, password and service
 * @param {*} email
 * @param {*} password
 * @param {*} service
 */
function getTransporter(email, password, service) {
    console.log('creating transporter');
    // Set up our node mailer
    const transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: email,
            pass: password
        },
    });
    console.log(transporter);
    return transporter;
}
