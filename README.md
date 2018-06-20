Starter code for Connect to Firebase section of the firebase workshop by Kunz Leigh & Associates!

If you would like to follow along with the workshop code, please follow the instructions in the Development environment set up section below. Our code is built using the Angular framework to make it clean and easy to build/work with. Do not worry, you need not have ANY experience with Angular to follow along. All coding will be done using the vanilla Javascript SDK for the app, and plain old JS in a node environment for Cloud Functions. A presenter will be coding along during the given work times to help if you get stuck.

## Working title: BrewerBase

Stackblitz link
https://stackblitz.com/github/kunzleigh/bcc-firebase-workshop/tree/connect-to-firebase
Please note the app will not work fully unless you connect it to your own firebase project
Adding your firebase web config keys to src/config/firebase.config.ts to see it in action :)

# Development environment set up 
## Please do before coming to the workshop
* Download Node, we recommend the LTS version (You will need at least version 8.9 to be compatible with the version of the Angular CLI we will be using)
    * https://nodejs.org/en/
* Open a terminal window and verify that you have npm installed with `npm -v`
* Install Firebase CLI latest version `npm install -g firebase-tools`
    * https://firebase.google.com/docs/cli/
* Install Angular CLI latest version `npm install -g @angular/cli`
    * https://cli.angular.io/
* Install git, or any git client that you are comfortable with
    * git https://git-scm.com/ 
    * Gitkraken is an easy to use free desktop client https://www.gitkraken.com/ 
* Clone our repository for the starter code
* You will want a good code editor, we recommend Visual Studio Code (free) or Webstorm (paid, has free trial)
    * https://code.visualstudio.com/
    * https://www.jetbrains.com/webstorm/
    * Other editors like Sublime and Atom also work well
* Run `npm install` from the root app directory to install app dependencies
* Run `npm install` from the /functions directory to install cloud functions dependencies
* Once you have the project set up, from the root directory you can run `ng serve` and point your browser to http://localhost:4200/ 
* The recomended browsers to use for development would be Google Chrome or Mozilla Firefox
    * https://www.google.com/chrome/
    * https://www.mozilla.org/en-US/

# Connect An App To Firebase

Goals:
* Set up a Firebase project 
* Add Firebase project web app configuration to our app
* Initialize our app as a Firebase app using the Javascript SDK
* Install Firebase CLI tools and log in

References:
* https://firebase.google.com/docs/web/setup
* https://nodejs.org/en/
* https://firebase.google.com/docs/cli/

Steps:
* Initialize a Firebase project https://console.firebase.google.com/
* Copy and paste the Firebase web config keys into the object defined in src/config/firebase.config.ts
* Initialize the Firebase app in the app.module.ts file
* Setup Firebase CLI if you have not already (We will use this later to deploy to hosting and cloud functions)
    1. Install Node LTS https://nodejs.org/en/
    2. Open a terminal on your machine and run `npm install -g firebase-tools`
    3. Run `firebase login` and login with the SAME account that you used to create your Firebase project
    
# Authentication

Goals:
* Set up ability for users to sign up and sign in anonymously, using email/password or Google
* Set up ability for users to convert an anonymous account to email/password or Google
* Set up monitoring of authentication state and ability to sign out
* Set auth language
* Learn how to use the built in password reset and verification functionality

References:
* https://firebase.google.com/docs/auth/web/start

Steps:
* Go to your Firebase project console https://console.firebase.google.com/
    1. Select Authentication from the menu
    2. Select the SIGN-IN METHOD tab
    3. Enable Email/Password, Google and Anonymous
* In src/app/auth/auth.component.ts file 
  * Implement sign up/in code for the three methods you enabled
  * Implement code to link a user to Email/Password or Google
  * Implement code to get the current user from Firebase auth, and to sign out
* In src/app/app.component.ts
  * Implement code to set the auth language and listen to auth state changes
* In src/app/home/home.component.ts     
  * Implement code to listen to auth state changes and sign out
* BONUS, if you have the time explore some of the bonus functionality we have drafted up in auth.component.ts, or check out the docs for something different

Wasn't that a lot easier than implementing auth from scratch?

# Firestore

Goals:
* Set up ability for user to read, add, update and delete breweries
* Set up ability for user to read, add, update and delete reviews as a sub collection owned by a brewery  document
* Set up basic Firestore security rules
* Set up relationship between user and brewery part 1

References
* https://firebase.google.com/docs/firestore/
* https://angularfirebase.com/lessons/firestore-nosql-data-modeling-by-example/
* https://angularfirebase.com/lessons/advanced-firestore-nosql-data-structure-examples/

Steps:
* In src/app/list/brewery-list.component.ts 
  * Get references to Firestore and breweries collection
  * Listen to changes in the breweries collection and make the collection accessible to the component 
    * Order the collection by the name field
  * Implement getting the user id from the current logged in user
  * Implement the ability to add and delete breweries from the collection
    * See src/app/models/brewery.model.ts for hints on what information we are expecting to save
* In src/app/brewery/brewery.component.ts 
  * Get references to Firestore and the brewery document associated with the ID in the route params
  * Listen to changes in the brewery document and make the brewery available to the component
  * Get the reviews collection from the brewery document, listen to changes and make it available to the component
  * Implement getting the user id from the current logged in user
  * Implement adding, saving and deleting a review
    * When adding a review, also add a document to the reviewMapping collection with a custom id of breweryId_uid
    * See src/app/models/review.model.ts and src/app/models/review-mapping.model.ts for hints on what information we are expecting to save
* In /firestore.rules
  * Set up auth based rules
  * Set up a rule that keeps users from reviewing a brewery more than once by checking if a review mapping exists

# Hosting

Goals:
* Host our app through Firebase!

References:
* https://firebase.google.com/docs/hosting/

Steps:
* If you have ng serve running, kill it with ctrl-c
* From the the app root directory run `firebase init` and answer the prompts as follows
    * CLI features - use the arrow keys and space bar to select
        1. Firestore
        2. Functions
        3. Hosting
        4. Storage
    * Hit enter to continue
    * Firestore Rules? 
        * Use the default (just hit enter)
    * Firestore Indexes? 
        * Use the default (just hit enter)
    * Language for Cloud Functions?
        * Select Javascript and hit enter
    * ESLint
        * Type `Y` and hit enter
    * Overwrite functions/package.json? 
        * Type `N` and hit enter
          * GOTCHA if you say yes here your functions will have a hard time finding the third party dependencies we have defined and won't work :(
    * Overwrite functions/.eslintrc.json?
        * Type `N` and hit enter
    * Overwrite functions/index.js?
        * Type `N` and hit enter
        * GOTCHA if you say yes here, you will not have the starter code for functions!
    * Install dependencies with npm now? 
        * Type `Y` and hit enter
    * What do you want to use as your public directory?
        * Type `dist` and hit enter
          * GOTCHA if you build and deploy your app but nothing shows up when you navigate to your hosting URL, it may be because you did not point to the dist directory in this step
    * Configure as a single page app?
        * Type `y` and hit enter
    * What file should be used for Storage Rules?
        * Tse the default (just hit enter)
* Run `ng build` to build your app
* Run  `firebase deploy --only hosting` 
    * Follow the link that the CLI tools spit out to reach your now publicly hosted app

# Cloud Functions

Goals:
* When a new user is created through auth, add a user to Firestore
  * Set up the user profile page in the app (Needed for the Storage section)
* When a review is updated or deleted, sync the data with a collection of reviews under the user who created it and update the average rating on the brewery
    * This will also include adding to the app the ability to read, delete and update reviews from a user profile screen (Optional)
* When a brewery is viewed send an http request to update the number of views on the brewery
* BONUS/TODO Cron jobs

References:
* https://firebase.google.com/docs/functions/
* https://github.com/firebase/functions-samples
* https://nodemailer.com/about/
* https://angularfirebase.com/lessons/firestore-cloud-functions-data-aggregation/

Steps:
* For each step you can run `firebase deploy --only functions` this will run ESLint before deploying and will fail if there are any errors. If the deploy succeeds, the functions will be immediately available
    * You can go to the Functions > logs section of your Firebase project console to help debug your functions
* If you have not already, run `npm install` from the /functions directory
* In functions/auth-functions.js, 
  * Implement the newUser function to create a user document in Firestore and send a welcome email if their email exists
    * We have supplied you with helper functions to actually send the email via nodemailer
    * HINT it will be a lot easier on you if you manually set the user document ID to be the Firebase auth UID for the user.
* In src/app/user-profile/user-profile.component.ts
    * Implement listening to the user document corresponding to the signed in user and make this data available to the component
    * Implement the ability to save the user 
* In functions/firestore-functions.js
    * Review update trigger
        1. Implement the checkReviewChanged function to decide whether the useful parts of the review actually changed
            * Yes you could use a 3rd party library like lodash for this if you want, but for this simple example we will implement it ourselves!
        2. Implement the updateBreweryReview function to sync the data to the reviews collection under the user that created it if the review changed during the update
        3. Implement the aggregateRatings function to update the average rating field on the reviews parent brewery document
        4. Call aggregateRatings from updateBreweryReview only if the rating changed during the review update
        5. Implement the updateUserReview function, it will be the same as updateBreweryReview, but will syncing the update with the brewery review.
    * Review delete trigger
        1. Implement deleteBreweryReview to delete the corresponding user review and aggregate the ratings on the brewery document
        3. Implement deleteUserReview to delete the corresponding brewery review as well as the brewery review mapping and aggregate the ratings on the brewery document
            * Deleting the mapping only needs to be done in one of the functions since the mapping exists only in one place, we chose to put it here but it would work fine in the deleteBreweryReview function as well
    * BONUS If you have the time/desire, implement code in the user-profile.component.ts to view, edit and delete the users reviews. This will work very similarly as in the brewery.component.ts file
* In functions/http-functions.js
    * Implement an express post endpoint that adds one to the views field on the posted brewery Id 
    * Update the brewery.component.ts postView functions to post the brewery Id to your function endpoint 
        * HINT: the root endpoint is part of the `firebase deploy --only functions` output.

# Storage & Cloud Vision

Goals:
* Set up the ability for a user to upload a profile image
* BONUS Set up a cloud function that will moderate the profile image using the Cloud Vision API
  * If the image is moderated, set the locked field on the User document to true
  * Update firestore and storage rules to block a locked user from doing any add/update/delete actions

References:
* https://cloud.google.com/vision/
* https://firebase.google.com/docs/storage/web/start
* https://codelabs.developers.google.com/codelabs/firebase-cloud-functions-angular/index.html?index=..%2F..%2Findex#0

Steps:
* In src/app/user-profile/user-profile.component.ts
    * We have provided you with the necessary code to select a file
    * When saving the user, if a file has been selected, upload that file to the users/ bucket with Firebase Storage. Listen to changes in upload state and When the upload is complete add the file path to the user and finish saving the user as done previously
    * Implement a function that gets the download URL of the storage object based off the path stored on the user
        * We do not directly save the download url only because when making changes to the file and reuploading it (e.g. with the our function coming up next) the download url changes
* BONUS In functions/storage.functions.js
    * If you want to continue with this portion, you will need to upgrade your firebase project to the blaze plan (pay as you) you will have free usage up to the limits and will be charged (very small amounts) after that. Do not worry though, for this workshop we will not be doing enough to warrant being charged and you can downgrade at any time
    * Implement a function that fires when a storage object has been finalized that uses the cloud vision api to detect whether or not the image has adult or violent content. If the image does, use ImageMagick to blur it, re upload it, and lock the user that uploaded the image
    * Implement Firestore rules that do not allow locked users to manipulate any data
