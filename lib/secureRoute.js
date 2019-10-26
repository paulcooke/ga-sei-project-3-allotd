const User = require('../models/User')
const { secret } = require('../config/environment')
const jwt = require('jsonwebtoken')

function secureRoute(req, res, next) {
  console.log('secure route called')
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized 1' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    console.log(payload)
    console.log(err)
    if (err) return res.status(401).json({ message: 'Unauthorized 2' })

    User
      .findById(payload.sub)
      .then(user => {
        if (!user) return res.status(401).json({ message: 'Unauthorized 3' })
        req.currentUser = user
        next()
      })
      .catch(() => res.status(401).json({ message: 'Unauthorized 4' }))
  })
}

module.exports = secureRoute