/* global api, describe, it, expect, beforeEach, afterEach */

const Veg = require('../../models/Veg')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = [{ 
  username: 'test',
  email: 'test@email.com',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'testTwo',
  email: 'testTwo@email.com',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('DELETE /vegetables/:id', () => {
  // eslint-disable-next-line prefer-const
  let token = null
  // eslint-disable-next-line prefer-const
  let incorrectToken = null
  // eslint-disable-next-line prefer-const
  let vegetable = null

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Veg.create({
          title: 'tomato',
          typeOfVeg: 'fruit',
          varietyOfVeg: 'cherry',
          pickedDate: 5,
          description: 'very sweet',
          image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
          isClaimed: false,
          vegLocation: 'SW18 4TQ',
          user: users[0]
        })
      })
      .then(createdVeg=> {
        vegetable = createdVeg
        done()
      })

  })
  afterEach(done => {
    User.deleteMany()
      .then(() => Veg.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.delete(`/api/vegetables/${vegetable._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return no data', done => {
    api.delete(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })
  
  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/vegetables/${vegetable._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })


  })


})
