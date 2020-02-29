const router = require("express").Router();

let Subscriber = require("../models/subscriber.model");

router.route("/").get((req, res) => {
  Subscriber.find()
    .then(subscribers => res.json(subscribers))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
  
  const email = req.body.email

  const newSubscriber = new Subscriber({ email});



newSubscriber.save()
.then(() => res.json ('you just suscribed to our newsletter'))
.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
 