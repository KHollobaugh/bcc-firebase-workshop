import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {

  public email = '';
  public password = '';

  /**
   * Create a Firebase auth user with a given email and password
   */
  createUserWithEmailAndPassword() {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log('Error signing user up with email and password ' + error.code + ': ' + error.message);
    })
  }

  /**
   * Sign in to Firebase auth with the given username and password
   */
  signInWithEmailAndPassword() {
    firebase
    .auth()
    .signInWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log('Incorrect username or password. Please try again or create an account ' + error.code + ': ' + error.message);
    })
  }

  /**
   * Sign in to Firebase auth with the Google provider
   */
  signInWithGoogle() {
    const provider = this.createGoogleAuthProvider();
    this.signInWithPopup(provider);
  }

  /**
   * Helper function to create a Firebase Google auth provider with custom parameters
   */
  createGoogleAuthProvider() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return provider;
  }

  /**
   * Generic helper function, pass it a Firebase auth provider and
   * handle signing in with a popup.
   * @param provider to sign in with
   */
  signInWithPopup(provider) {
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log('There was an error authenticating email address:' + error.email + ' with' + provider.providerId + '\n\n' + error.errorMessage);
    });
  }

  /**
   * Sign in to Firebase auth anonymously using the user IP
   */
  signInAnonymously() {
    firebase
    .auth()
    .signInAnonymously()
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log('Anonymous login failed ' + error.code + ': ' + error.message);
    })
  }

   /**
   * Link an existing Firebase user to a Google sign in
   */
  linkAccountToGoogle() {
    const provider = this.createGoogleAuthProvider();
    firebase.auth().currentUser.linkWithPopup(provider).then((result) => {
      const credential = result.credential;
      const user = result.user;
      console.log('Account linked to Google successfully', user);
    })
    .catch((error) => {
      console.log('Account failed to link to Google', error);
    })
  }

  /**
   * Link an existing Firebase user to an email/password sign in
   */
  linkAccountToEmailAndPassword() {
    const credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password);
    firebase.auth().currentUser.linkWithCredential(credential).then((user) => {
      console.log('Account linked to email/password successfully', user);
    }, (error) => {
      console.log('Account failed to link to email/password', error);
    });
  }

  /**
   * Helper function to show that the user was signed in successfully
   * @param user
   */
  signInSuccessful(user) {
    alert('Successfully signed in as ' + user.displayName);
  }

  /**
   * Sign out of Firebase auth
   */
  signOut() {
    firebase.auth().signOut();
  }

  /**
   * Retrieve the current user from Firebase auth
   */
  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  /**
   * BONUS
   * Complete these on your own if you like, consult the docs or
   * our finished code for help.
   */

  /**
   * Sign in to Firebase auth with the Facebook provider
   * HINT You will need to obtain API credentials from Facebook for this.
   */
  signInWithFacebook() {

}
}
