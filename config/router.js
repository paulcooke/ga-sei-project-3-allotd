const router = require('express').Router() 
const vegetables = require('../controllers/vegetables') 
const users = require('../controllers/auth') 
const secureRoute = require('../lib/secureRoute') 
const appointments = require('../controllers/appointments')

router.route('/vegetables') 
  .get(vegetables.index) 
  .post(secureRoute, vegetables.create) 

// Note the contollers are named the same as the exports at the bottom of the /controllers/animals.js file

router.route('/vegetables/map') // added by CS 2.45pm Saturday 


router.route('/vegetables/:id') 
  .get(vegetables.show) 
  .put(secureRoute, vegetables.update) 
  .delete(secureRoute, vegetables.delete)

// router.route('/vegetables/:id/comments') 
//   .post(vegetables.commentCreate)

// router.route('/vegetables/:id/comments/:commentId') 
//   .delete(vegetables.commentDelete)

router.route('/register') 
  .post(users.register)

router.route('/login') 
  .post(users.login) 

router.route('/profile/:id')
  .get(secureRoute, users.profile)

router.route('/profile/:id/edit')  
  .put(secureRoute, users.update)

router.route('/appointments')
  .get(appointments.index)

router.route('/vegetables/:id/appointment')
  .post(secureRoute, appointments.create)

router.route('/appointments/:id')
  .patch(appointments.update) // THIS IS A PATCH NOT A PUT (JJ)
  .delete(appointments.deleteAppointment)
  .get(appointments.show)

module.exports = router  // exporting our router module for use in index.js
