const nodemailer = require('nodemailer');
const defaultImagePath = '../../assets/img/no-image.png';
const admin = require('firebase-admin');

 /**
  * Function responds to the first sign on event of a user through any method
  * the trigger returns a Firebase User see the following for reference
  * https://firebase.google.com/docs/reference/js/firebase.User
  */
module.exports.newUser = function(user, context) {

}

/**
 * Helper function to send a welcome email using nodemailer, see the following for reference
 * https://nodemailer.com
 * Note that this library is NOT tied to firebase, it is just
 * one (free) option for sending emails using node that we chose to use
 */
function sendWelcomeEmail(email) {
    /**
     * Get gmail email and password from firebase functions config
     */

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
