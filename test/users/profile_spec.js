/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = {
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('GET /profile', () => {
  let token = null // to store token of our created user, so we can use it request the profile

  beforeEach(done => {
    User.create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }) 
        done()
      })
  })

  afterEach(done => { // as always removing any animals and users after the tests are complete
    User.deleteMany()
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.get('/api/profile')
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
  
  it('should return a 200 response with a token', done => {
    api.get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'username',
          'createdAnimals'
        ])
        done()
      })
  })

  it('should not return the user password and email', done => {
    api.get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.not.contains.keys([
          'password',
          'email'
        ])
        done()
      })
  })
})
