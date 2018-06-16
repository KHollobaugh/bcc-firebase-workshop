import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreweryListComponent } from './list/brewery-list.component';
import { EditBreweryComponent } from './edit-brewery/edit-brewery.component';
import { BreweryComponent } from './brewery/brewery.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './review/review.component';
import { environment } from '../environments/environment';

/*
 * Firebase initialization and configuration happens here
 */

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    BreweryListComponent,
    EditBreweryComponent,
    BreweryComponent,
    UserProfileComponent,
    ReviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
