const defaultImagePath = '../../assets/img/no-image.png';
const admin = require('firebase-admin');

/**
 * Takes in a firestore change and context for a brewery review
 * and updates the corresponding review on the owning users review collection
 * and updates the average rating on the brewery the review belongs to if needed
 * @param {*} change
 * @param {*} context
 */
module.exports.updateBreweryReview = function(change, context) {
    console.log(change);
    console.log(context);
    const reviewId = context.params.reviewId;
    const previousValue = change.before.data();
    const newValue = change.after.data();

    // Sync changes with user review collection.
    const docRef = admin.firestore().collection('users').doc(newValue.uid);
    updateReview(docRef, newValue, previousValue, reviewId);
}

/**
 * Takes in a firestore change and context for a user review
 * and updates the corresponding review on the owning brewery
 * and updates the average rating on the brewery the review belongs to if needed
 * @param {*} change
 * @param {*} context
 */
module.exports.updateUserReview = function(change, context) {
    console.log(change);
    console.log(context);
    const reviewId = context.params.reviewId;
    const previousValue = change.before.data();
    const newValue = change.after.data();

    // Sync changes with user review collection.
    const docRef = admin.firestore().collection('breweries').doc(newValue.breweryId);
    updateReview(docRef, newValue, previousValue, reviewId);
}

/**
 * Deletes the corresponding review on the users collection and updates the average rating on the brewery
 * @param {*} snashot
 * @param {*} context
 */
module.exports.deleteBreweryReview = function(snapshot, context) {
    const reviewId = context.params.reviewId;
    const deletedReview = snapshot.data();
    const userReviewDocRef = admin.firestore()
                                  .collection('users')
                                  .doc(deletedReview.uid)
                                  .collection('reviews')
                                  .doc(reviewId);
    return userReviewDocRef.delete().then(() => {
      console.log('Successfully delete user review');
      return aggregateRatings(deletedReview.breweryId);
    }).catch(e => {
      console.log('Failed to delete user review', e);
    });
}

/**
 * Deletes the corresponding review on the breweries collection
 * updates the average rating on the brewery
 * deleted the review mapping
 * @param {*} snashot
 * @param {*} context
 */
module.exports.deleteUserReview = function(snapshot, context) {
  const reviewId = context.params.reviewId;
  const deletedReview = snapshot.data();
  // Create a batch for atomicity
  const deleteBatch = admin.firestore().batch();
  // Get the brewery review to be deleted alongside the user review
  // Alternately can be written as
  // const breweryReviewDocRef = admin.firestore().doc(`breweries/${deletedReview.breweryId}/reviews/${reviewId}`);
  const breweryReviewDocRef = admin.firestore()
                                   .collection('breweries')
                                   .doc(deletedReview.breweryId)
                                   .collection('reviews')
                                   .doc(reviewId);
  deleteBatch.delete(breweryReviewDocRef);
  const reviewMappingDocRef = admin.firestore().collection('reviewMapping').doc(`${deletedReview.breweryId}_${deletedReview.uid}`);
  deleteBatch.delete(reviewMappingDocRef);
  return deleteBatch.commit().then(() => {
    console.log('Successfully deleted brewery review and review mapping in batch');
    return aggregateRatings(deletedReview.breweryId);
  }).catch(e => {
    console.log('Failed to delete brewery review and review mapping in batch', e);
  });
}

/**
 * Function to delete the old user profile image when a new one is upload
 * so we do not crowd the storage bucket!
 * @param {*} change
 * @param {*} context
 */
module.exports.userProfileImageChange = function(change, context) {
    const userId = context.params.userId;
    const previousValue = change.before.data();
    const newValue = change.after.data();
    console.log(`previous value ${previousValue.profileImageUrl}`);
    console.log(`new value ${newValue.profileImageUrl}`);
    if (previousValue.profileImageUrl && newValue.profileImageUrl && !(newValue.profileImageUrl  === previousValue.profileImageUrl  || newValue.profileImageUrl  === defaultImagePath )) {
        const bucket = gcs.bucket('kla-firebase-workshop.appspot.com')
                          .file(`users/${userId}/${previousValue.profileImagePath}`)
                          .delete()
                          .then(() => {
                            return null;
                           })
                          .catch(err => {
                            console.error('ERROR:', err);
                          });
    }
    return null;
}

/**
 * Aggregates review data for breweries
 */
function aggregateRatings(breweryId) {
    const docRef = admin.firestore().collection('breweries').doc(breweryId);

    return docRef.collection('reviews').get().then(querySnapshot => {
        const numberReviews = querySnapshot.size;
        const totalRating = querySnapshot.docs.map(doc => doc.data().rating)
                                                .reduce((rating, total) => rating + total, 0);
                                                console.log(totalRating);
        const averageRating = (totalRating / numberReviews).toFixed(2);
        console.log(averageRating);

        return docRef.update({ averageRating:  averageRating, numberReviews: numberReviews });
    }).catch(e => {
        console.log(`Error fetching brewery ratings for ID ${breweryId}`);
        console.log(e);
    });
}

 /**
  * Helper function to sync the given review between users and breweries if changes were made
  * and to update the average rating on the brewery if rating was changed
  * @param {*} docRefToUpdate
  * @param {*} newValue
  * @param {*} previousValue
  * @param {*} reviewId
  */
 function updateReview(docRefToUpdate, newValue, previousValue, reviewId) {
    if (checkReviewChanged(newValue, previousValue)) {
        docRefToUpdate.collection('reviews').doc(reviewId).set(newValue);
    } else return null;

    // Only update the average if there is a difference
    if (newValue && previousValue && newValue.rating === previousValue.rating) return null;
    return aggregateRatings(newValue.breweryId);
 }

 /**
  * Helper function to determine if there was a meaningful change between the given reviews
  * @param {*} newValue
  * @param {*} previousValue
  */
 function checkReviewChanged(newValue, previousValue) {
     return newValue.rating !== previousValue.rating ||
            newValue.text !== previousValue.text ||
            newValue.title !== previousValue.title;
 }
