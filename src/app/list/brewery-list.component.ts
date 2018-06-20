import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './brewery-list.component.html'
})
export class BreweryListComponent implements OnInit {
  breweryListQueryRef;
  unsubscribeFromRef;
  breweryList;
  db;
  numberOfViewsFilter;
  breweryNameFilter;

  constructor(private router: Router) { }

  ngOnInit() {
    // Get Firestore reference

    // Get breweries collection reference from Firestore, querying to sort by name and listen to changes
  }

  /**
   * Set up listener
   */
  listenToRefSnapshot() {
    // Unsubscribe to the current listener if it exists
  }

  /**
   * Filter breweries by views, name or both!
   */
  filterBreweries() {

  }

  /**
   * Add a new brewery to Firestore to breweries collection
   */
  addBrewery() {
    // Can use this.router.navigate(['/brewery', newBrewery.id]); to navigate to the new brewery
  }

  /**
   * Delete a brewery from Firestore breweries collection
   * @param id
   */
  deleteBrewery(id) {

  }

  /**
   * Retrieve the uid off of the current Firebase auth user
   */
  getCurrentUid() {

  }

  /**
   * Helper function to create a new brewery object
   */
  createNewBrewery() {
    return {
      name: 'New Brewery',
      description: 'This is a new Brewery',
      createdOn: firebase.firestore.FieldValue.serverTimestamp(),
      uid: this.getCurrentUid()
    };
  }
}
