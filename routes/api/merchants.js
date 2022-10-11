var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Merchant = require('../../models/Merchant.js');


router.post('/', function(req, res, next) {
    Merchant.create(req.body, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });
  

router.get('/:van', function(req, res, next) {
    console.log(req.params.mcc);
    Merchant.find({van:parseInt(req.params.van)}, function (err, data) {
      if (err) return next(err);
      console.log(err);
      console.log(data);
      res.json(data);
    });
  });


  router.get('/', function(req, res, next) {
    Merchant.find(function (err, merchants) {
      if (err) return next(err);
      res.json(merchants);
    });
  });

  router.put('/:van', function(req, res, next) {
    let payment_info = {
        amount: req.body.payments.amount,
        customer_name: req.body.payments.customer_name, 
        payment_mode: req.body.payments.payment_mode
    };

    Merchant.findOneAndUpdate({van:parseInt(req.params.van)}, {"$addToSet" : {"payments": payment_info}}, {new: true}, function (err, data) {
      if (err) return next(err);
      res.json(data);
    });
  });

  module.exports = router;
