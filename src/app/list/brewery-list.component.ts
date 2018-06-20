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
    this.db = firebase.firestore();
    // Get breweries collection reference from Firestore, querying to sort by name and listen to changes
    this.breweryListQueryRef = this.db.collection('breweries');
    this.listenToRefSnapshot();
  }

  /**
   * Set up listener
   */
  listenToRefSnapshot() {
    // Unsubscribe to the current listener if it exists
    if (this.unsubscribeFromRef) {
      this.unsubscribeFromRef();
    }

    this.unsubscribeFromRef = this.breweryListQueryRef.onSnapshot((snapShot) => {
      this.breweryList = snapShot.docs.map((d) => {
        const data = d.data();
        const id = d.id;
        return { ...data, id: id };
      });
    });
  }

  /**
   * Filter breweries by views, name or both!
   */
  filterBreweries() {
    if (this.numberOfViewsFilter && this.breweryNameFilter) {
      this.breweryListQueryRef = this.db.collection('breweries').where('views', '>=', this.numberOfViewsFilter)
                                                         .where('name', '==', this.breweryNameFilter);
    } else if (this.numberOfViewsFilter) {
      this.breweryListQueryRef = this.db.collection('breweries').where('views', '>=', this.numberOfViewsFilter);
    } else if (this.breweryNameFilter) {
      this.breweryListQueryRef = this.db.collection('breweries').where('name', '==', this.breweryNameFilter);
    }
    this.breweryListQueryRef.get().then(a => {
      console.log('We have the results from that filter once!');
    });
    // Or we can listen to changes that correspond to our query conditions
    this.listenToRefSnapshot();
  }

  /**
   * Add a new brewery to Firestore to breweries collection
   */
  addBrewery() {
    this.db.collection('breweries').add(
      this.createNewBrewery()
    ).then(newBrewery => {
      alert('New brewery added!');
      this.router.navigate(['/brewery', newBrewery.id]);
    }).catch(e => {
      alert('There was an error adding a new brewery ' + e);
    });
  }

  /**
   * Delete a brewery from Firestore breweries collection
   * @param id
   */
  deleteBrewery(id) {
    this.db.collection('breweries').doc(id).delete().catch(e => {
      alert('There was an error deleting the brewery ' + e);
    });
  }

  /**
   * Retrieve the uid off of the current Firebase auth user
   */
  getCurrentUid() {
    return firebase.auth().currentUser.uid;
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
