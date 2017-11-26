// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AllReviewsController', ['$scope', 'Review', function($scope,
      Review) {
    $scope.reviews = Review.find({
      filter: {
        include: [
          'bookStore',
          'reviewer'
        ]
      }
    });
  }])
  .controller('AddReviewController', ['$scope', 'BookStore', 'Review',
      '$state', function($scope, BookStore, Review, $state) {
    $scope.action = 'Add';
    $scope.bookStores = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = false;

    BookStore
      .find()
      .$promise
      .then(function(bookStores) {
        $scope.bookStores = bookStores;
        $scope.selectedShop = $scope.selectedShop || bookStores[0];
      });

    $scope.submitForm = function() {
      Review
        .create({
          rating: $scope.review.rating,
          comments: $scope.review.comments,
          bookStoreId: $scope.selectedShop.id
        })
        .$promise
        .then(function() {
          $state.go('all-reviews');
        });
    };
  }])
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Review
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-reviews');
      });
  }])
  .controller('EditReviewController', ['$scope', '$q', 'BookStore', 'Review',
      '$stateParams', '$state', function($scope, $q, BookStore, Review,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.bookStores = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = true;

    $q
      .all([
        BookStore.find().$promise,
        Review.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        var bookStores = $scope.bookStores = data[0];
        $scope.review = data[1];
        $scope.selectedShop;

        var selectedShopIndex = bookStores
          .map(function(bookStore) {
            return bookStore.id;
          })
          .indexOf($scope.review.bookStoreId);
        $scope.selectedShop = bookStores[selectedShopIndex];
      });

    $scope.submitForm = function() {
      $scope.review.bookStoreId = $scope.selectedShop.id;
      $scope.review
        .$save()
        .then(function(review) {
          $state.go('all-reviews');
        });
    };
  }])
  .controller('MyReviewsController', ['$scope', 'Review',
      function($scope, Review) {
        // after a refresh, the currenUser is not immediately on the scope
        // So, we're watching it on the scope and load my reviews only then.
        $scope.$watch('currentUser.id', function(value) {
          if (!value) {
            return;
          }
          $scope.reviews = Review.find({
            filter: {
              where: {
                customerId: $scope.currentUser.id
              },
              include: [
                'bookStore',
                'reviewer'
              ]
            }
          });
        });
  }]);
