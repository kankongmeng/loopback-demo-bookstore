var async = require('async');
module.exports = function(app) {
  // app.dataSources.mysqlDs.automigrate('BookStore', function(err) {
    // if (err) throw err;

    // app.models.BookStore.create([{
      // name: 'The Book Thing',
      // city: 'Singapore'
    // }, ], function(err, bookStores) {
      // if (err) throw err;

      // console.log('Models created: \n', bookStores);
    // });
  // });
  
  var User = app.models.User;
  User.create({email: 'foo@bar.com', password: 'bar'}, function(err, userInstance) {
    console.log(userInstance);
  });
  
  ////data sources
  // var mongoDs = app.dataSources.mongoDs; // 'name' of your mongo connector, you can find it in datasource.json
  // var mysqlDs = app.dataSources.mysqlDs;
  //// create all models
  // async.parallel({
    // reviewers: async.apply(createReviewers),
    // bookStores: async.apply(createBookStores),
  // }, function(err, results) {
    // if (err) throw err;
    // createReviews(results.reviewers, results.bookStores, function(err) {
      // console.log('> models created sucessfully');
    // });
  // });
  
  //// create reviewers
  // function createReviewers(cb) {
    // mongoDs.automigrate('Reviewer', function(err) {
      // if (err) return cb(err);
      // var Reviewer = app.models.Reviewer;
      // Reviewer.create([{
        // email: 'foo@bar.com',
        // password: 'foobar'
      // }, {
        // email: 'john@doe.com',
        // password: 'johndoe'
      // }, {
        // email: 'jane@doe.com',
        // password: 'janedoe'
      // }], cb);
    // });
  // }
  
  ////create book stores
  // function createBookStores(cb) {
    // mysqlDs.automigrate('BookStore', function(err) {
      // if (err) return cb(err);
      // var BookStore = app.models.BookStore;
      // BookStore.create([{
        // name: '1st Story Book Store',
        // city: 'Singapore'
      // }, {
        // name: '2nd Story Book Store',
        // city: 'Malaysia'
      // }, {
        // name: '3rd Story Book Store',
        // city: 'Thailand'
      // }, ], cb);
    // });
  // }
  ////create reviews
  // function createReviews(reviewers, bookStores, cb) {
    // mongoDs.automigrate('Review', function(err) {
      // if (err) return cb(err);
      // var Review = app.models.Review;
      // var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      // Review.create([{
        // date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        // rating: 5,
        // comments: 'A very good book shop.',
        // customerId: reviewers[0].id,
        // bookStoreId: bookStores[0].id,
      // }, {
        // date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        // rating: 5,
        // comments: 'Quite pleasant.',
        // customerId: reviewers[1].id,
        // bookStoreId: bookStores[0].id,
      // }, {
        // date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        // rating: 4,
        // comments: 'It was ok.',
        // customerId: reviewers[1].id,
        // bookStoreId: bookStores[1].id,
      // }, {
        // date: Date.now() - (DAY_IN_MILLISECONDS),
        // rating: 4,
        // comments: 'I go here everyday.',
        // customerId: reviewers[2].id,
        // bookStoreId: bookStores[2].id,
      // }], cb);
    // });
  // }
};