const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Veg = require('../models/Veg')
const User = require('../models/User')

mongoose.connect(
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err) // if connect fails, will send an error to the console and exit
    db.dropDatabase() // on a good connect, first drop all data in the database
      .then(() => {
        return User.create([
          {
            username: 'Lloyd',
            email: 'lloyd@email.com',
            password: 'pass',
            passwordConfirmation: 'pass',
            availablePickUpDays: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ], 
            availablePickUpTimes: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23' ],
            addressLineOne: 'Peaches Castle', 
            addressLineTwo: '', 
            addressCity: 'The mushroom Kingdom', 
            addressPostcode: 'E4 8JA'
          },
          {
            username: 'Claire',
            email: 'claire@email.com',
            password: 'pass',
            passwordConfirmation: 'pass',
            availablePickUpDays: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ], 
            availablePickUpTimes: [ '18', '19', '20' ],
            addressLineOne: '60 Disney Lane', 
            addressLineTwo: 'Marshmellow World', 
            addressCity: 'Paris', 
            addressPostcode: 'E8 2RS'
          },
          {
            username: 'jenny',
            email: 'jenny@email.com',
            password: 'pass',
            passwordConfirmation: 'pass',
            availablePickUpDays: [ 'Saturday', 'Sunday' ], 
            availablePickUpTimes: [ '9', '10' ],
            addressLineOne: 'Round here', 
            addressLineTwo: 'Aldgate', 
            addressCity: 'Lodon', 
            addressPostcode: 'E15 4BQ'
          },
          {
            username: 'Paul',
            email: 'paul@email.com',
            password: 'pass',
            passwordConfirmation: 'pass',
            availablePickUpDays: [ 'Tuesday', 'Wednesday' ], 
            availablePickUpTimes: [ '18', '19', '20' ],
            addressLineOne: '15 Cerulean Lane', 
            addressLineTwo: '', 
            addressCity: 'Cerulean City', 
            addressPostcode: 'NW10 7AB' 
          },
          {
            username: 'Lydia',
            email: 'lydia@email.com',
            password: 'pass',
            passwordConfirmation: 'pass',
            availablePickUpDays: [ 'Tuesday', 'Wednesday' ], 
            availablePickUpTimes: [ '20', '21' ],
            addressLineOne: '15 Cerulean Lane', 
            addressLineTwo: '', 
            addressCity: 'Cerulean City', 
            addressPostcode: 'SE8 5HY' 
          },
          {
            username: 'Felicia',
            email: 'felicia@email.com',
            password: 'pass',
            passwordConfirmation: 'pass',
            availablePickUpDays: [ 'Tuesday', 'Wednesday' ], 
            availablePickUpTimes: [ '18', '19', '20' ],
            addressLineOne: '15 Cerulean Lane', 
            addressLineTwo: '', 
            addressCity: 'Cerulean City', 
            addressPostcode: 'NW6 7TT' 
          }
          
        ])
      })
      .then(users => {
        return Veg.create([
          {
            title: 'Box of tomato',
            typeOfVeg: 'tomato',
            varietyOfVeg: 'cherry',
            pickedDate: 5,
            description: 'very sweet',
            image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
            isClaimed: false,
            vegLocation: 'SW18 4TQ',
            user: users[0],
            availablePickUpDays: ['Monday', 'Tuesday'],
            availablePickUpTimes: ['18', '19']
          },
          {
            title: 'A basket of cucumbers',
            typeOfVeg: 'cucumber',
            varietyOfVeg: 'armenian',
            pickedDate: 8,
            description: 'mmmmm so juicy',
            image: 'https://www.edenbrothers.com/store/media/Seeds-Vegetables/resized/SVCUC124-1_medium.jpg',
            isClaimed: false,
            vegLocation: 'SW11 1XT',
            user: users[1],
            availablePickUpDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            availablePickUpTimes: ['8', '9', '10']
          },
          {
            title: '5 Aubergines',
            typeOfVeg: 'Aubergine',
            varietyOfVeg: 'English',
            pickedDate: 5,
            description: 'Full of flavour and quite large. ',
            image: 'https://www.nhm.ac.uk/content/dam/nhmwww/discover/aubergine-evolution/aubergine-shutterstock-full-width.jpg.thumb.1920.1920.png',
            isClaimed: false,
            vegLocation: 'SW13 9PF',
            user: users[2],
            availablePickUpDays: ['Saturday', 'Sunday'],
            availablePickUpTimes: ['9', '10', '11']
          },
          {
            title: 'A bunch of asparagus',
            typeOfVeg: 'Asparagus',
            varietyOfVeg: 'English',
            pickedDate: 5,
            description: 'beautiful colour...',
            image: 'https://www.thespruce.com/thmb/AslNxNSnIywOCJuM4fcUAU7VWBA=/1983x1416/filters:fill(auto,1)/Asparagus-GettyImages-135630192-5be349fcc9e77c0051aac6ea.jpg',
            isClaimed: false,
            vegLocation: 'SW12 8RJ',
            user: users[3],
            availablePickUpDays: ['Wednesday', 'Thursday', 'Friday'],
            availablePickUpTimes: ['12', '13']
          },
          { title: 'Delicious Broad beans',
            typeOfVeg: 'Broad Beans',
            varietyOfVeg: 'English',
            pickedDate: 5,
            description: 'freshly picked and crunchy',
            image: 'https://www.thompson-morgan.com/static-images/master/static-images/how-to-grow-broadbeans/how-to-grow-broad-beans-lead.jpg',
            isClaimed: false,
            vegLocation: 'E8 2RS',
            user: users[0],
            availablePickUpDays: ['Friday', 'Saturday'],
            availablePickUpTimes: ['14', '15']
          },
          { title: 'Halloween Pumpkins',
            typeOfVeg: 'Pumpkin',
            varietyOfVeg: 'American',
            pickedDate: 5,
            description: 'Big, scary pumpkins',
            image: 'https://www.quickenloans.com/blog/wp-content/uploads/2013/10/Stock-HalloweenPumpkins-t20_knkgvE.jpg',
            isClaimed: false,
            vegLocation: 'NW6 3PJ',
            user: users[2],
            availablePickUpDays: ['Friday', 'Saturday'],
            availablePickUpTimes: ['14', '15']
          },
          { title: 'Lots of Mushrooms',
            typeOfVeg: 'Mushrooms',
            varietyOfVeg: 'French',
            pickedDate: 2,
            description: 'yum yum yum',
            image: 'https://www.goodnewsnetwork.org/wp-content/uploads/2019/03/Mushrooms-National-University-of-Singapore-Released.jpg',
            isClaimed: false,
            vegLocation: 'W4 2LJ',
            user: users[3],
            availablePickUpDays: ['Monday', 'Tuesday'],
            availablePickUpTimes: ['19', '20']
          },
          { title: 'My Cauliflower',
            typeOfVeg: 'Cauliflower',
            varietyOfVeg: 'Garden',
            pickedDate: 10,
            description: 'earthy',
            image: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/4F91/production/_108296302_cauliflowergetty.jpg',
            isClaimed: false,
            vegLocation: 'N5 2HS',
            user: users[1],
            availablePickUpDays: ['Wednesday', 'Friday'],
            availablePickUpTimes: ['10', '11']
          },
          { title: ' 10 Courgettes',
            typeOfVeg: 'Courgette',
            varietyOfVeg: 'French',
            pickedDate: 2,
            description: 'small but flavoursome',
            image: 'https://www.marshalls-seeds.co.uk/images/products/product_8155.jpg',
            isClaimed: false,
            vegLocation: 'SW3 3RA',
            user: users[5],
            availablePickUpDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            availablePickUpTimes: ['19', '20', '21', '22']
          },
          { title: 'Bunch of carrots',
            typeOfVeg: 'Carrots',
            varietyOfVeg: 'from my garden',
            pickedDate: 2,
            description: 'sweet and lots of flavour',
            image: 'https://www.foxandbriar.com/wp-content/uploads/2019/03/Honey-Roasted-Carrots-1-of-9.jpg',
            isClaimed: false,
            vegLocation: 'SE8 3BU',
            user: users[4],
            availablePickUpDays: ['Monday', 'Tuesday'],
            availablePickUpTimes: ['7', '8', '9', '10']
          }
        ])
      })
      .then(vegetables => console.log(`${vegetables.length} Vegetables created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)