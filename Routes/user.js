const router = require('express').Router();
let User = require('../Models/userModel');    //import user model for saving it into database

router.route('/').get((req, res) => {                   // this is our first route that handles GET requests on the /user url path. root url is localhost:3000/user/? . And here we get a list of all the users from the MongoDb atlas database.
  User.find()                                       // here find method return a promise and the data is comming in json format. 
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {    // when there is add in url it means it handles the POST request
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User Successfully added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;