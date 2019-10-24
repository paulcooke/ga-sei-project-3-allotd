const router = require('express').Router() 
const vegetables = require('../controllers/vegetables') 
const users = require('../controllers/auth') 
//const secureRoute = require('../lib/secureRoute') 

router.route('/vegetables') 
  .get(vegetables.index) 
  .post(vegetables.create) 

// Note the contollers are named the same as the exports at the bottom of the /controllers/animals.js file

router.route('/vegetables/:id') 
  .get(vegetables.show) 
  .put(vegetables.update) 
  .delete(vegetables.delete)

// router.route('/vegetables/:id/comments') 
//   .post(vegetables.commentCreate)

// router.route('/vegetables/:id/comments/:commentId') 
//   .delete(vegetables.commentDelete)

router.route('/register') 
  .post(users.register)

router.route('/login') 
  .post(users.login) 

/* router.route('/profile')
  .get(users.profile) */

module.exports = router  // exporting our router module for use in index.js
