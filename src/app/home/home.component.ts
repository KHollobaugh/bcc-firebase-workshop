import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  displayName;
  isAuthenticated;

  /**
   * Listen to Firebase auth state changes
   */
  ngOnInit() {

  }

  /**
   * Sign out of Firebase auth
   */
  signOut() {

  }
}
