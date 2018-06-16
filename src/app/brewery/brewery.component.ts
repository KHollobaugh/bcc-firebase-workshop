import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html'
})
export class BreweryComponent implements OnInit {
  brewery = {
    id: '',
    name: '',
    description: '',
    views: 0,
    averageRating: 0
  };
  reviews = [];
  breweryRef;
  reviewsRef;
  db;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Get Firestore reference
    this.db = firebase.firestore();
    // Listening to Angular route changes
    this.route.params.subscribe(params => {
      // Getting the brewery id out of the route
      const breweryId = params['id'];
      // Tell the backend this brewery was viewed
      this.postView(breweryId);
      /**
       * Get brewery document reference from Firestore and listen to changes
       */

      /**
       * Get brewery reviews collection reference from Firestore and listen to changes
       */

    });
  }

  /**
   * Add a review to the reviews collection and a corresponding review mapping
   */
  addReview() {

  }

  /**
   * Update the given review on the reviews collection
   * @param review
   */
  saveReview(review) {

  }

  /**
   * Delete the given review id from the reviews collection
   */
  deleteReview(id) {

  }

  /**
   * Make an HTTP Post request to the functions backend to update the number of views on the given brewery
   * @param breweryId
   */
  postView(breweryId) {
    this.http.post('', {}).subscribe((data: any) => {
      console.log(`You are viewer number ${data.views}`);
    });
  }

  /**
   * You know what to do ;)
   */
  getCurrentUid() {

  }

  /**
   * Helper function to create a new review object
   */
  createNewReview() {
    return {
      uid: this.getCurrentUid(),
      createdOn: firebase.firestore.FieldValue.serverTimestamp(),
      rating: 0
    };
  }
}
