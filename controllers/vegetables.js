// 24/10/19 3:30pm - added at the beginning by paul.

const Veg = require('../models/Veg')

// index route - /vegetables
function index(req, res) {
  Veg
    .find()
    .populate('user')
    .then(vegetables => res.status(200).json(vegetables)) 
    .catch(() => res.status(404).json({ message: 'Not Found' })) 
}

// create route - /vegetables
function create(req, res, next) {
  req.body.user = req.currentUser 
  Veg
    .create(req.body) 
    .then(vegetable => res.status(201).json(vegetable)) 
    .catch(next) 
}

// show route - /vegetables/:id
function show(req, res) {
  Veg
    .findById(req.params.id) 
    .populate('user')
    .populate('comments.user')
    .then(vegetable => {
      if (!vegetable) return res.status(404).json({ message: 'Not Found ' }) 
      res.status(200).json(vegetable) 
    })
    .catch(() => res.status(404).json({ message: 'Not Found ' })) 
}

// update route - /animals/id
function update(req, res, next) {
  Veg
    .findById(req.params.id)
    .then(vegetable => {
      if (!vegetable) return res.status(404).json({ message: 'Not Found' }) 
      if (!vegetable.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' }) 
      return vegetable.set(req.body) 
    })
    .then(vegetable => vegetable.save()) 
    .then(vegetable => res.status(202).json(vegetable)) // if anything goes wrong we send back the error response
}

// delete route - /animals/id
function deleteRoute(req, res) {
  Veg
    .findById(req.params.id) // special method to find by the id and remove in one step
    .then(vegetable => {
      if (!vegetable.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' }) // see above function for the same line
      return vegetable.remove()
    })
    .then(() => res.sendStatus(204)) // just send back a 204 with no content to show it has been deleted
    .catch(err => res.status(400).json(err)) // send any errors if something goes wrong.
}

// exporting our 'Route Handler' functions to be used buy our Router, found in 'config/router.js'
module.exports = {
  index, 
  create,
  show,
  update,
  delete: deleteRoute
} 