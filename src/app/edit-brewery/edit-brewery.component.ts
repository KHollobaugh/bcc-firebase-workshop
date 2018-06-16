import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-edit-brewery',
  templateUrl: './edit-brewery.component.html'
})
export class EditBreweryComponent implements OnInit {
  brewery = {
    id: '',
    name: '',
    description: ''
  };
  breweryRef;
  db;

  /**
   * Angular uses constructors for dependency injection
   * @param route the current route handled by the Angular router
   */
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.db = firebase.firestore();
    this.route.params.subscribe(params => {
      // Getting the brewery id out of the route
      const breweryId = params['id'];
      /**
       * Get brewery document reference from Firestore
       */
      this.breweryRef = this.db.collection('breweries').doc(breweryId);
      this.breweryRef.get().then((doc) => {
        this.brewery = { ...doc.data(), id: doc.id }
      });
    });
  }

  /**
   * Update the brewery document
   */
  saveBrewery() {
    this.breweryRef
      .update(this.brewery)
      .then(() => {
        alert('Saved successfully!');
      }).catch(e => {
        alert('There was an error saving the brewery ' + e);
      });
  }

  // Ignore me this bit is to make some materialize styling work with angular template binding :)
  decideLabelClass(prop) {
    return prop && prop !== '' ? 'active' : '';
  }
}
