var express = require('express');
var sprints = require('../controllers/sprint');

var router = express.Router();

router.post('/', function (req, res) {
  sprints.create(req.body, function (err, sprint, code){
    res.status(code);
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprint);
    }
  });
})

router.post('/:sprintid/vote', function (req, res) {
  var sprintid = req.params.sprintid;
  sprints.vote(sprintid, req.body, function (err, sprint, code){
    res.status(code);
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprint);
    }
  });
})

router.get('/', function (req, res) {
  var sprintid = req.params.sprintid;
  sprints.all(function (err, sprints, code){
    res.status(code);
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprints);
    }
  });
})

router.get('/:sprintid', function (req, res) {
  var sprintid = req.params.sprintid;
  sprints.query({'index' : sprintid}, function (err, sprint, code){
    res.status(code);
    if (err) {
      res.send({'error': err});
    } else {
      res.send(sprint);
    }
  });
})

module.exports = router;
