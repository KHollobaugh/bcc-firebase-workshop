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

  }

  /**
   * Sign in to Firebase auth with the given username and password
   */
  signInWithEmailAndPassword() {

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

  }

  /**
   * Generic helper function, pass it a Firebase auth provider and
   * handle signing in with a popup.
   * @param provider to sign in with
   */
  signInWithPopup(provider) {

  }

  /**
   * Sign in to Firebase auth anonymously using the user IP
   */
  signInAnonymously() {

  }

   /**
   * Link an existing Firebase user to a Google sign in
   */
  linkAccountToGoogle() {
    const provider = this.createGoogleAuthProvider();
    // Link with popup
  }

  /**
   * Link an existing Firebase user to an email/password sign in
   */
  linkAccountToEmailAndPassword() {

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
