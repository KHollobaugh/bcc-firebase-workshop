import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated;

  /**
   * This function is called when the component is initialized
   * Listen to Firebase auth state changes
   * Set auth language
   */
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.isAuthenticated = user != null;
    });
  }
}
