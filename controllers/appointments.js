const Appointment = require('../models/Appointment')

// index route - /appointments
function index(req, res) {
  Appointment
    .find()
    .populate('pickerId')
    .populate('vegId')
    .populate('growerId')
    .then(appointment => res.status(200).json(appointment)) 
    .catch(() => res.status(404).json({ message: 'Not Found' })) 
}

// create route - /vegetables/:id/appointment
function create(req, res, next) {
  req.body.vegId = req.params.id 
  req.body.pickerId = req.currentUser 
  //req.body.expiryDate = 
  Appointment
    .create(req.body) 
    .then(appointment => res.status(201).json(appointment)) 
    .catch(next) 
}

// show route GET - /appointment/:id
function show(req, res) {
  Appointment
    .findById(req.params.id) 
    .populate('pickerId')
    .populate('vegId')
    .populate('growerId')
    .then(appointment => {
      if (!appointment) return res.status(404).json({ message: 'Not Found ' })
      res.status(200).json(appointment)
    })
    .catch(() => res.status(404).json({ message: 'Not Found ' }))
}

//.populate({ growerId: appointment.vegId.user })
//appointment.set(appointment.vegId.user)
//appointment.save()

// update route - /appointments/id
function update(req, res, next) {
  Appointment
    .findById(req.params.id)
    .then(appointment => {
      if (!appointment) return res.status(404).json({ message: 'Not Found' })
      appointment.set(req.body)
      return appointment.save()
    }) 
    .then(appointment => res.status(202).json(appointment)) 
    .catch(next)
}

// delete route - /appointments/id
function deleteAppointment(req, res) {
  Appointment
    .findById(req.params.id)
    .then(appointment => appointment.remove())
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}

// //DELETE WITH AUTHORISATION 
// function deleteRoute(req, res) {
//   Appointment
//     .findById(req.params.id) // special method to find by the id and remove in one step
//     .then(appointment => {
//       if (!appointment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' }) // see above function for the same line
//       return appointment.remove()
//     })
//     .then(() => res.sendStatus(204)) // just send back a 204 with no content to show it has been deleted
//     .catch(err => res.status(400).json(err)) // send any errors if something goes wrong.
// }

// exporting our 'Route Handler' functions to be used buy our Router, found in 'config/router.js'
module.exports = { 
  create, 
  update, 
  deleteAppointment, 
  show, 
  index
} 