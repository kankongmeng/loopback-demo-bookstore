'use strict';

module.exports = function(Bookstore) {
  Bookstore.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };
  
  Bookstore.getName = function(shopId, cb) {
    Bookstore.findById( shopId, function (err, instance) {
        var response = "Name of book shop is " + instance.name;
        cb(null, response);
        console.log(response);
    });
  };
  
  Bookstore.remoteMethod(
    'status', {
      http: {
        path: '/status',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );
  
  Bookstore.remoteMethod (
    'getName',
    {
      http: {path: '/getname', verb: 'get'},
      accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
      returns: {arg: 'name', type: 'string'}
    }
  );
};
