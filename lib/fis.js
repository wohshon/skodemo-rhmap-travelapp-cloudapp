var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function fisRoute() {
  var fis = new express.Router();
  fis.use(cors());
  fis.use(bodyParser());
  
  fis.get('/', function(req, res) {
    console.log(req);
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  fis.post('/', function(req, res) {
   // console.log(new Date(), 'In fis route POST / req.body=', req.body);
   console.log("fis POST: " + JSON.stringify(req.body));
  
// var url = 'http://181.47.68.177:8182/book';
//  var url='http://fuse-forum-prod.cloudapps.forum.rhtechofficelatam.com/rest/book';
  var url='http://fusetravelagency-sko.cloudapps-ocp34-wohshon.ddns.net/rest/book';

  console.log("=================");
  console.log(req.body.bookReq);
  console.log("=================");


  console.log("+++++++++++++++++");
  delete req.body.bookReq["traveller"];
  console.log(req.body.bookReq);
  console.log("+++++++++++++++++");
  
  request.post({
    url:url,
    json:req.body.bookReq
  },function(error, response, body){
    if(error) {
        console.log("FIS ERROR: " + error);
    } else {
        console.log(response.statusCode, body);
        res.json(body);
}
});
  /*
  
    var rta =  {
		"flightResp": {
			"flightNo": 123,
			"flightDate": "01/01/2016",
			"flightPassengers": 2,
      "flightFrom": "EZE",
      "flightTo": "GRU",
      "flightResCode": "AAA333",
      "flightPrice": 1234,
      "flightResStatus": "OK",
      "flightDisc":30
		},
		"hotelResp": {
			"hotelId": 123,
			"hotelArrivalDate": "01/01/2016",
			"hotelNights": 3,
      "hotelCity": "GRU",
      "hotelResCode": "AAA333",
      "hotelPrice": 567,
      "hotelResStatus": "OK",
      "hotelDisc":10
		},
		"carResp": {
			"carRentalCo": 123,
			"carStartDate": "01/01/2016",
			"carType": "abc",
			"carDays": 3,
      "carCity": "GRU",
      "carResCode": "AAA333",
      "carPrice": 222,
      "carResStatus": "OK",
      "carDisc":15
		}
	};
    // see http://expressjs.com/4x/api.html#res.json
    res.json(rta);*/
  });

  return fis;
}

module.exports = fisRoute;
