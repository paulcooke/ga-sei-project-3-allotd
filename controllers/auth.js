// 24/10/19 3:30pm - added at the beginning by paul. comented out profile route and profile export 

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

// register route - /register
function register(req, res, next) {
  User
    .create(req.body) 
    .then(user => res.status(201).json({ message: `Thanks for Registering ${user.username}` })) 
    .catch(next)
}
// login route -/login
// user suplies in body of request, email and password only
function login(req, res) {
  User
    .findOne({ email: req.body.email }) 
    .then(user => { 
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' }) 
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }) 
      res.status(202).json({ message: `Welcome Back ${user.username}`, token })
    }) 
    .catch(() => res.status(401).json({ message: 'Unauthorized' } ))
}

// profile route  /profile/:id
function profile(req, res) { // route for a user profile
  User
    .findById(req.currentUser._id) // this must be a secureRoute, it uses the user id gathered from the token, to find the user in our DB
    .populate('listingHistory')
    .populate('pickedVegHistory')
    .then(user => res.status(200).json(user)) //sending the found user back
    .catch(err => res.json(err)) // sending any errors
}

//profile route -/profile/:id/edit
function update(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      if (req.params.id === (req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' }) 
      user.set(req.body)
      return user.save()
    }) 
    .then(user => res.status(202).json(user)) 
    .catch(next)
}

module.exports = {
  profile,
  register,
  login, 
  update
}
