const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Person } = require("../models/person");

router.get("/", (req, res) => {
  Person.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Person :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Person.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Person :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", (req, res) => {
  var per = new Person({
    name: req.body.name,
    age: req.body.age,
    mobile: req.body.mobile,
    gender: req.body.gender
  });
  per.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Person Save :" + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var per = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  };
  Person.findByIdAndUpdate(
    req.params.id,
    { $set: per },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Person Update :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Person.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Person Delete :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
