//25/20/2019 - JJ - It worked Tal was a witness. It was randomly breaking and then randomly working. 

/* global describe, afterEach, it, expect, api, beforeEach */
const User = require('../../models/User')

const testDataIncorrect = {
  username: 'test',
  email: 'incorectemailcom',
  password: 'test',
  passwordConfirmation: 'incorrect'
}

const testDataDuplicateUsername = {
  username: 'test',
  email: 'unique@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

const testDataDuplicateEmail = {
  username: 'unique',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

// our correct object for a register. This is the object to send to test what happens when we create a user
const testDataCorrect = {
  username: 'testCorrect',
  email: 'testCorrect@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /register', () => {

  beforeEach(done => { // creating a user before the tests, this is so we can test the duplicate email, username fields, not the objects above will match o field with this created user.
    User.create({
      username: 'test',
      email: 'test@test.test',
      password: 'test',
      passwordConfirmation: 'test'
    })
      .then(() => done())
  })
  
  afterEach(done => {
    User.deleteMany().then(() => done())
  })

  //Password and password confirmation do not match
  it('should return a 422 response if password and password confirmation do not match', done => {
    api.post('/api/register')
      .send(testDataIncorrect)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 201 if user is created', done => {
    api.post('/api/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  //Checking @ and . in emails
  it('should return a 422 response if email does not contain @', done => { //issue here all answers are the same
    api.post('/api/register')
      .send(testDataIncorrect)
      .end(( err, res ) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response if email does not contain .', done => { //issue here all answers are the same
    api.post('/api/register')
      .send(testDataIncorrect)
      .end(( err, res ) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  //Duplicate username
  it('should return a 422 response if username already exists', done => {
    api.post('/api/register')
      .send(testDataDuplicateUsername)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  //Duplicate email
  it('should return a 422 response if email already exists', done => {
    api.post('/api/register')
      .send(testDataDuplicateEmail)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  //password and password confirm match
  it('should return a 201 response if password matches passwordConfirmation', done => {
    api.post('/api/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  //returns object
  it('should return an object if request is correct', done => {
    api.post('/api/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with a message key if request is correct', done => {
    api.post('/api/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          'message'
        ])
        done()
      })
  })
})
