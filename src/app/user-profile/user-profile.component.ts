import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  profileImageUrl = '../../assets/img/no-image.png';
  user = {
    displayName: '',
    birthDate: null,
    profileImagePath: '',
    id: ''
  };
  userRef;
  db;
  storageRef;
  reviewsRef;
  reviews = [];

  profileImageFile;
  uploadTask;
  filePath = '';

  ngOnInit() {
    // Get Firestore reference
    this.db = firebase.firestore();
    // Get Storage reference
    this.storageRef = firebase.storage().ref();
    /**
     * Get the User document matching the auth uid from Firestore
     */

    /**
     * Get user reviews collection reference from Firestore and listen to changes
     * HINT almost exactly the same as on the brewery component, just a differenct base collection
     */

  }

  /**
   * Save user to Firestore
   * If a profileImageFile was uploaded, save that to the Storage reference
   */
  saveUser() {

  }

  /**
   * Helper function to extract the file when one is selected
   */
  onFileSelected(event) {
    const files = event.srcElement.files;
    this.profileImageFile = files[0];
    this.filePath = this.profileImageFile.name;
  }

  /**
   * Helper function to reset file upload
   */
  resetUpload() {
    this.filePath = '';
    this.profileImageFile = undefined;
  }

  /**
   * Get the user profile image url from the path saved on the user document
   */
  getUserProfileImageUrl() {

  }

  /**
   * Save the given review to the user reviews collection
   * @param review
   */
  saveReview(review) {

  }

  /**
   * Delete the given review from the user reviews collection
   * @param id
   */
  deleteReview(id) {

  }
}
