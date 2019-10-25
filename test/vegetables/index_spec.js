/* global describe, beforeEach, afterEach, it, expect, api */ 

const Veg = require('../../models/Veg')
const User = require('../../models/User')

describe('GET /vegetables', () => {
  beforeEach(done => {
    User.create({ 
      username: 'Claire',
      email: 'claire@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(users => {
        return Veg.create([
          {
            title: 'tomato',
            typeOfVeg: 'fruit',
            varietyOfVeg: 'cherry',
            pickedDate: 5,
            description: 'very sweet',
            image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
            isClaimed: false,
            vegLocation: 'SW18 4TQ',
            user: users
          },
          {
            title: 'cucumber',
            typeOfVeg: 'gourd',
            varietyOfVeg: 'armenian',
            pickedDate: 8,
            description: 'mmmmm so juicy',
            image: 'https://www.edenbrothers.com/store/media/Seeds-Vegetables/resized/SVCUC124-1_medium.jpg',
            isClaimed: false,
            vegLocation: 'SW11 1XT',
            user: users
          },
          {
            title: 'aubergine',
            typeOfVeg: 'gourd',
            varietyOfVeg: 'English',
            pickedDate: 5,
            description: 'Full of flavour and quite large. ',
            image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
            isClaimed: false,
            vegLocation: 'SW13 9PF',
            user: users
          },
          {
            title: 'Asparagus',
            typeOfVeg: 'Asparagus',
            varietyOfVeg: 'English',
            pickedDate: 5,
            description: 'beautiful colour...',
            image: 'https://www.thespruce.com/thmb/AslNxNSnIywOCJuM4fcUAU7VWBA=/1983x1416/filters:fill(auto,1)/Asparagus-GettyImages-135630192-5be349fcc9e77c0051aac6ea.jpg',
            isClaimed: false,
            vegLocation: 'SW12 8RJ',
            user: users
          }
        ])
      })
      .then(() => done())
  })
  afterEach(done => {
    User.deleteMany()
      .then(() => Veg.deleteMany())
      .then(() => done())
  })
  it('should return a 200 reponse', done => {
    api.get('/api/vegetables')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })
  it('should return an array' , done => {
    api.get('/api/vegetables')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
  it('should return an array of objects', done => {
    api.get('/api/vegetables')
      .end((err, res) => {
        res.body.forEach(vegetables => {
          expect(vegetables).to.be.an('object')
        })
        done()
      })
  })
  it('should return the correct fields', done => {
    api.get('/api/vegetables')
      .end((err, res) => {
        res.body.forEach(vegetables => {
          expect(vegetables).to.contains.keys(['_id', 
            'title',
            'typeOfVeg',
            'varietyOfVeg',
            'pickedDate',
            'description',
            'image',
            'isClaimed',
            'vegLocation',
            'user'])
        })
        done()
      })
  })
  it('should return the correct data types', done => {
    api.get('/api/vegetables')
      .end((err, res) => {
        res.body.forEach(vegetables => {
          expect(vegetables._id).to.be.a('string')
          expect(vegetables.title).to.be.a('string')
          expect(vegetables.typeOfVeg).to.be.a('string')
          expect(vegetables.pickedDate).to.be.a('string')
          expect(vegetables.description).to.be.a('string')
          expect(vegetables.image).to.be.a('string')
          expect(vegetables.isClaimed).to.be.a('boolean')
          expect(vegetables.user).to.be.an('object')
        })
        done()

      })
  })

})