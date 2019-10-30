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
            addressPostcode: 'M4R1O'
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
            addressPostcode: 'E156TW'
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
            addressPostcode: 'SE8 7AB' 
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
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMWFhUXGBgVGBgXGBUYGhkYGBYXFhcYGhcYHSggGBolGxUXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKzUtLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABHEAABAwIEAwUGAgYHBgcAAAABAAIRAyEEEjFBBVFhBiJxgZETMqGxwfAH0RQjNEJS4SRicnOys/ElM0N0gqIVFjVjZJLC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAJhEAAgICAgICAwADAQAAAAAAAAECEQMhEjEyQRNRBCJhQlKRFP/aAAwDAQACEQMRAD8AoFW5QtTdMcPhHVDDfMnQdUJjqeSWnbcJzkXdAcpnw3ERYxHLnNiEDVwwFNr8xzHURpfmtKBA3QsMlaNsQ3I9zc0wdeY2K8NQ85CI4qA5jS33mjrJbrHkSTPik3t0jVDRVqw3CNLarXNtBn4RHnMJhxDDkPcYtMelvoguENzCTuY8gJJRz8T3nOGhJssnsD7LL2Trd1zeR+iC7W4Il4eNCL+Sl7N4wFxbAG9ky7SUM1F0ai6HsCKOXBmlz8kO58ryovGDf7lEc3aOamYhXPlbNqxJ5An0SsDQLjnZqjiOfyEfRQFq1D73RjqXdlYr0N8JS/o9I6WdbnL3X9I+C1GIc1pbsVv2ewVevTysw9Vwb7r206jmm5JBcBE3U2MwD6Uiox7Haw8Fttdwk9kWnYA2pBkG/RWXsxjMxIOqq5qN3b6GE47N4hueGiD4omok4qxtOs53vOJkDYdUz4HBpyeZ0PzlKO04/XAjcBE8CBLXZj3RbxJ2WRPItFhAbt81rxR7WYaq54zDIZaSYdMACR1IWtCqALAJT2srH2BGUXc2ZjnNp3tttKWSdkYRuSKXSG52+aIa9QO5LZhVEjsexlg8WRbmnLbtJ3Gvgq3QdceKsDqgAA8yQnRCaM1TDh1AiXRIbpIsSbD8/JA0qRJESZ+ad1WmmwNAHM66nx0jT1WlKkSk6BeIV3H3r9UndBOsH73R+JdN/ghadHcefRRQI6C8FPPcCehsjhUI+/ml7XAAjofzHxTPCUDULQP3onpz+qeLFZtimZQDN3CY5A9eqCebwmGLeHOJGmg8BYITDUc1SPvUJ0gl3/Dk/wC0Kg5UPrSXUly38PG/7TxB/wDaI/7qf5LqSLO/B4HzLTLW0f1ckn3p58vBKnuB94TCO4bUnMyBe4PghjTmdkzObpguIcHgiItYDomHAw005NNhc1xEkCYiboFzYdCjwuJLQ5u0z9FNobuNBmIc17h3QMpAAaAJE3CFrcHomzC5pkwXHMLTA29V4ydVI1xEJbCm10bUOHOp0rd6feLZIbO380DWfeE+wDpzibEQfRLH8LGofy1HW9wtyXRoyt7PeBYjLVaesK+1CHNg6ELnFFpa8A2IP1V5w1eWhaTHKJxKhkqObGhQ5Nh5p52sp98OG4v5JAXWTdoZdHhcsLrHwPyTHs92exONfkw9IuggOdo1mbQudsLHmbaK+U/wZr5RnxVOSLtaxxi14cSJjnAS2Okcy4RwiviamTD0n1XASQ0aDmSbN8yuydivwvDQ2rjgHGP9xYgH+u4GD4C3Uq5dhuzNLA4f2VLUnNUcbuc6AJPkNBZP9Pmg2VUL7PKdJoAa0AAWAFgB0GygxWCZUBa9oc3k4AidjHNFAc1CWXtIQsaip1uxOA9v7R+GpkxEQQwnWSwHKT5J1/4XhshYKNNo0gMaNeUBMqlIHUT97KMtI92/RYHFFc/8k4R7s1Sg0kCBJcR6SlnH+wgyThSKeWT7P90+exV7LwRrf0UZfLTOoRYrxxZxWmMrixwIe0w5p1B8EF2lANAybiCNNj16HZXztbwD9LGdrslRk5HgWNvdcdS0keSo/HOzfEKdH9lcXOIaTTyvsbaA5hPgl76ON4HGVoocrdpR+I7OYym3M/C12t5+zf8AGBZDYbDlz8hBB3BtHiDonLPQTg6Ga+w1+ia0WQtzRFNgbzMn5BM+HcPmHPGVvU3O9hz/ADRtRVs5pSsN4TShpcQLCQeugj4+iDxlQg20Vlwpp+zeHdxmWx1IcLg9b2jqq3igSMzbg7qfLntEAEOJ+KHNXKZ5KVoN+Yv5b/RDVjKA6CsNDmvfEEQLaHMeW2isHAhDHncNd8bfVI8BT/VOPN7fgHJzweqGkh2hEHz+/gnQJdgjaneTfgODz1Ijp5A3SethXCoWb7dQuicGwTcPSzPgOIEzsqRehoQtjfslgWUq74/3j2lxPSW28Lq3qh9jXZsY9/tGummbDYZmK+LHdi8dHyhRd3geqMxbRnkaG/5pfQ94eI+aPpvzCI90kz0JTM5pI0FIOtMO/d69EvqSJBEHdG1tV7VZ7RpI98aj+Ic/FIBMA2BUxbp4SoXWA9UUdegACUZsI4Ydfu5W9VsfQ7FQUGkSPPy2XlGv+6dJg/M+CRoT2R45oIkajfomHBsb3AJ0S3E2MdPmjuwmB9vimMIPswQ53hrHmmrRaKss1DsfWxjAYLW7Oj81dOCfhrw+jTipRFd/7zqve9G+6PISrXRaIAAgCEQtdHTGCQHwrhlHDNyYekymyZhgAva5A8NUXVnWVgHqtHSbIWOQNrEEARM3Glt0Y4Sg/YRUFRxmBAEaHcot7uSVewsjcCIjyUT8TUkBjQf4iTEHlC9rXG48FJhqUTeZOa/hp4ISTfQUzZhMSTc8tuiwOIHP5qQNUVURonWhSGs2b69OqmpvDhbXdC13gA9fVbUgA3SCLcvArGBcU4gW038eiKwFYPYM0SFAQ6o0ty3G/NaPoEEOaRydA5LAGTXzNt/JIu0vBKNdpzsGcaPAAcPPWOidF4LTe+4QFWvNo71h/aCIGk9M5RWwwpVi1wDniPeGlrZZ01+4RGGYTc3MyfRMu3nA35/0hhgtEQN2iXG/MSVWez3GCKgz3DZcT0A+K55xbls87LjadDbj7CBTp6QMxHMn/VK2uFOw0Oo6b/fRMK2MFX9YBrf0sVG4Atkjcjw3/NWgqICnF08hzN0Oh+ihOR9/dPqP5JjYjIfdM/y+M/ZSivTLSWnZNS7RRDNtEsoDQh1SxG4DUXTZF/L1BWlSl/RqHi93xA+iacDwXtnBg6GfA3+Ep4oDVse9l+HB7W1qo9yQ0ncfkEN2k4oXuytNgm/HK4o0RTp6AZfvxVOdJBJMC+u6okh8jpcUWf8ADH9sf/ckf97F1Jcq/C0/0t9/+E7n/GxdVSy7Or8fwPmXi/BzTcHsuwkeV9PBLsPVDahzCxkeqecF4oHD2dS82E/JB8f4VlOdnunXonkiSYJWpmeoQ9IkOBbqimulgOhAg39Co6zjEbKdCBHEMG14FWnoPfA2P5FLs0lF8OxXs3Xu02cOYWY/CezcHNux12n5jxCUKNsOYh2sAi/Tb4pax+/VMcGZa4byI87fkltFkjwN0rRkE4n3Af4XR5H/AEVr/CfBvcS7KQ3MXZjoeQ+CrNWkPYku3c30Lsv1XT+xFdvs8rYAmB5AR99Fr0dGEvVFynDkHRde+qJSHUbkrWnUi0T/ADUbybAb/BeiGkmeQuh30GiWp1W4ch/0gLSlWnll1RegEr3chfYGynEabqKnUuZW4dJt9wsjEm8KGoR97lbVCBdYWyLBYwNlJ6Tp5L1jYdBJkiB1UrxF/JQ1KZMPnS9tUbAeV+5JbGg+C8ZUGQOB1N1Fin5gInrbRR4Fo9nPP4LWYh4lUy3Fj929FthixwEjTfmgcU1zzkEkk76aWJKIGALBZ0wNOXmlu2AB404ucKZAjc9LzK5p2v4azBmKfu1dAb5YuWzqRcK58V4pDgdDpe0TsT4Kh9vsd7R9NoMgZnFxM8hb4op2SyJNAvBsfDg0wGk+h5+CcV6mUkESDtp8VTqFS6umMpHIDuAAd9ky+jhyRpkVZgEDUEAjz/mhqtPOOoHqEU4TSadxLT5X+qjwpvaxBnylMl6J9B9Vk4WjGxc34g/Iq39ncIMNhzVfZzhbw29VFwPhDKtMTYB+cjrEEDobLXtJxAvf7Ngs3l0+4VUtlV+q5f8ABdV4gXPJcAQdjp0S/H6S4hreZsOgH5KKrUcwOe4QGguk3E6AW67KvYviWYB9U5nXgbDwGyLkuhIRcuzof4V4sOxz2NHdFBxzHUw+noNhddbXCvwQxRfxKr/y7v8AMpruqQ78ceMaPk6mxwgwrJwviYP6t/gJ36KtVW7tOvWfko6TzPVUZz0P+I4D2b87RLHDK4cp3S2sIBB8E74fxFr+443+aH4jgbEtFhr+aRisSvkOAO6ZcOeHtNF5gG7T/C7byQdMTMjfzC8c0gmfI9EKMbCk5jnMcIIafUX+igaP1hGz/wD9QR8VYcFTGIaHf8RgLT/WaQR6hIMbTLS3wA9CUrQUbcXkYY8xl9cwK6F2AqtDDOoAF+S57x580wObmk+cn6I/gvEjSM05dJiBr4QUkutF8OkduoYmb6mbIxuIEKo0BWyBxNzcgC46C6mrcTtlBknckWPIjz+Cl8lLZ1UWJ2PaDEoWtjMxSKljyHlrnA2BEDTY2WzKhDov5Xvt4haM72Zoee0Xrqhkcr/ysl1N79DztCmNcg3t5ouSMkMWvUtOsQgGYiyIpX3nwRv6MM6TpCx1SLLWk3KLranTm5WMeVGkyB/JelgAy8hqsr1MumigbiBlBnfzW6MQYy0QYj481HgIyW1mY+qh4pXtA+9tlvwRshzjfkhyTdAGNJkMAi5+Zulld72kixE6Tf8A0TVjp8rITF6T98pTmZRsbT9o8h7e6bweei53244WKVRr2EljpEbNIiw6Quq18pkOvynn9gJbxDhVLEMy1GgtNrQIOxHIpUqZKWzj9ArodI5mg8/qB+aofFsA7DVX03zDZg/xN2I8lceCVs9Cg48mz4iB9FWHZyZlqzbCm1Sn0zjysfgT6LzhlKaoA8PWykwgiqCdjlP9k2+SsvZThWWq+rUs2nNzzH039E6IpcnRYS39Hw2UWdFzyJ1KpnEKwAgbmSdz1+OiZcY4oazjHugwAkOI1v4Jm6Rsk03oXcZP6sN/iM67Dp5qkYyvLjGmiuPaSt7Ohmdrmho52v5CB6qitN1Ndl8C1Z1D8Af2+qf/AI7v8ymu/LgP4Bf+oVf+Xd/mU135FHYfGGCedBZMqVY77QlOFMOB20TUDKVkSyIIZVIII1BT7AcRDxlOuniqyCt80QWm6d7JUP8AEYbKczdNOv8AogsPXhxa5uZo8rzzRGCx4cBOu4WuJohsu5gFJZNqg/hePpseIYW9cxKztdhwHNeB3XAkeO49T8VXTVM/H8lbmltfD5He9TAf4wJI8wsGqK7jGgseHC2Vo9Ggkjqp+wvDjVxPfBc1jcwN4J/dzfGxQ+Nn2Zi5dnd6yrh2RxbKeGpNpi7rkge8796fvZL6LYi0txZAMjcXGw+wVvTwtGoZc1rvEfHxQmBrucXgi8+S2wrXtLfdAIv1jQqbj9nQn9E/EOFsiWNAI3i5vpOpUdSs8Nu11t2g+HK6PrggAi9/h0WtetDTbopuFXWh7J+HMdGZ5vyG3nuUXUpToboHAudEwj2DS6ZJVRrIhRLdb9RuZ5IvCNIdJ8h1WNPNeF/wvKHGg2NQ6YCleJCHp1gYUucJxSCvpGnPwS2tSaakAmCOeiLxdXbySqpicrw4AAAZZ69Err2YkxGHLqjWNOUak8zy8Uxo4MUmQHGOVvsJDiccc4dpOhTDE8QzN6m291L9U2xt0MHua0AA6m8boDiWLjNM26bRqi6rQ1gNpaPsqtcWxDSyxJe4iRPKdRyVWKxTiKxnXTpYa7eaPwlTTwjxhJfbS6Dub+W3pCa0ILW7cvNTT2SQk7acKZXw7iffaJY7cEbeB0VX7D4rPTFPdrreBd/MK39pqsU3AEaR8CuddiqxbiWci+PiPqAunG7JZY3EvnDMEalbKNz9b/JWHtJxENHsKZ7rfePMjZLGYj2JeKRlzrZt4OzeXiknEOJ06Nqr+8R7re870/d8Sq6S2ciuqj2MC8MZme4NbdxJMbfE9BdVfiHa1gJ9jTzGT3n2HQhoufNIOLcRfiH537CGtGjQNh+e6BcoubZ0Q/HS8ibG4+pVM1Xlx2nQeA0GmyHAhGcN4PXruhjIGuZ/dbB3k6+Uqx4Lsk1jgazxUg+6yQDe0u1jpZOoS7KSyQhpj38AP2+r/wAu7/Mprv65T+FNNrcVUDGta003GGiBOdq6smqtD4581Z8dYnDhtgvaVSRBNx8Qtqve0QWIJbcWU4lskU0HVHxfmsLlHSqZmExEESOh3CwFVTOVr0bCoWmQm+GxPtaZZ++DI6t380mJWjahY4EINezONoYsonNa+yb4Cs9lYuaO6IBnQgCLoTgpNV2YtBaNTG/JMsTiNtkYxs55yp0aYhlO4Em0DaLk+eqN7O05IyjLoAB7oIkG3WPilLzumXAsTlqAnQrZI0h8Mt7L5hWZROxgGPC6kFIOGZpuNEMzGSLa6/mFO9wDc7NeU2+7qLOxBYBdAmDrefsqGgX5i15EgyImI2N91JgK4eJMTCB4tXLHhzZjQ8h5pJa2MMsPVIOUnQx9UzpGyp9LGAuJGts02iI0A8U2wuP6z9/JZSMPS+LlblwiEvp4kEXcI6fd1JSa5wkHzj6clmwoZMrZWyN/BY+ubSQJGkwlzcO4AgOnx/0W1SvSc0OEHlpOmnip8vvQWa4nFCY7xEwSNPAHdDuonIC6wuQ36k80PVxTqhDWjutvZpNxoB6KDjdXEOpxRp98wBIhoved7CfNIsifQeLJcBSa5pkzMgyt6dNzXsyOmL968R9ETSwFUsaHANmJOv8AaT+jhWtb3QB980/DkBaK9jn13NjJm/iLToIJBj6JJXoOpjN7N4Oglpk8zOyuOGxAa8tJsfmveKAZSSBp6LfH7sDZR6FGBJ1N5RH6M17S24mbtJB8jteEq4hjmsJaXRGnhfdQYbjQY0kOBuY5jx5rUSsg7TPLGfxvfLQIvPh0GpVU4XVZhjIaKlU6GTkZOwGrjrJt0nUmYvEmrXsc1nuI2aMjrz4pc5ovoqRbSIZX6C8bx+uRJfkHJnd01vqZ8VUamJLnFxU/E8XnOUaBAKkU3tj44cVYwZUlWTspw6lUzueMxbYNPu3Fj1OqqFKpCsvY7FxWLdntPqLj4SmhFc1Yc18HRdAbCNtlHiHQvAdVo4AldVHmFu/ClsYp/wDdH/GxdVXLfwv/AGp/907/ABMXUlKapno/j+B8eVHBoMJPVqElTOqSIUOVSSo6ZSsY4Z0NCl9qD0+ShotsnXC+Bl8OfZvzRjbeic+KVsVOstWsLiGi82Vw/QKYEZRlWU8FSaS4NAPyV/hkcn/oiRYWgKNP2YvuT1KHqGFNiCQVA8StVaJduyJ1aCpBVi4E7hQvoE/RaNkS0+IWq1TGWhzhePxAIy9DmA9QnXDuKsc0tcXDkQcw6XCrOGOYRb0UNfht5bY9LLkl+roqsjXsumBxrm84Gptz1jcJnXrlzQS0upkgSGzckNFh+7MSeSp3Z+nUIe17jDYIM6zMieUwV0DBkwAYMJVtHTCVoU04jJMFptETe9p1F1rhKrg5uUmRqHDQHcaWt8UfxjhntILTB6awq+GEOIfUIcO6CbWB5aG4SfwcthpNiXd4nlIi0aSjqWPbzmPJUGninh0PJewfwnx1AvCOw3E2uBf3xTbodtRYDcytJ1tG5Frr46RY2MCdrmPNT4TBUmkNqFoLyS0EgE2vM+CpVbjtQ2ok0xBuYLjI1uIF+XRIadKHtc8lxBnMTfWSPvmpqNu5InL8lLUTuVKkxghrQAh/aDONvTdUThHaY0Wltd4cye6+bt6Ebjqn3DuNYSs//fsdGxIEnwVmq0hoZVLZYcXWEW8bdEPhsQ4iItBynSbr01KZJ7wAjYhaUnMNi4QDAAKPbHtCTiWNDX7l42HOdB5SheJ8c/VmTc7RoOZ9E04ljKQDmiJFxpqqp2rpk089EZbzAEySBFvFDixXJCZ1cSXPIMWAjzCpfHKbw9oa4jOS4jYGRp6py7CPYC+oHAi8uBieshV9+Kz1i+wEwJ5Df6plEnZYeD0RTpun3nNMnczY/ApJxmtkZAPecY8vuyLwLyQ95NoyDlchxv8A9I9QlHGmkkHYIf5UTjFylYrXi8leFWLHspn2bqFuJpH+tH/2Bb9UrTjstRz4imBsc58G3+ceqK7BLxZ0Fo+K2ykW3Py2UjGwL7XK8pd4ydSf9F2Vs8xFv/DIRinDc0XH/vYunrl34aunHVDypEeQewLqK5snkehg8D4tqUCPdOYdPyUFIGUW0EXCOpUxUFgM33dTH5UEcDwueoBFhcq0vMaaIThWDFFkn3zqpKlXmq49HFnnzlro2dUWok6FQ1KiiNRWUyaiEVAY7wQzm8luMSd7r3M09EW4yNTQMKixzwddVP8Ao0/yUH6sGHNcFNpxHR60FhzN0TM1AGF7nd0CSTsgWU92GRyOqg4nTeaRDJgEEtG43H1joo5cfJWgrbo0wHaY5nNc2GP00sOptdW3hnGg2JmYGsfA7j81zMukc+qKwvEHsI7xjSDsOk2UaOxa6Osv40HCzgDfcWsqr2pxTalLuzmaC7NMRF9VX6nFwGnKXCdtfTklmL4vVqNyGzeQn0JWSG5ETOKVx/xHXV14djvacPGbRr8kDXNIJJ6GZ9FQA1M+EViMzLw4ZvNoJBjwn4ITVoEumW6mbWM/fxWtTFga84M/dkrwmKjf7+iKqHNyk69RsUsf6cvEL/SWuBYTANr7dQUndhc4tZzbEc/5qYMjT03ReDwznm3MA+H5hVSRloUso1ZhmaekrYVqjD77s3RxgfzTPi+KDP1VI9HuGvgOSUUmclKTQxOcXUc4uc9xcepHTQaKdmIqNuajh0DjPrKjaQBb4fmlPFsbHcbqdTrbkpq5OkBK2TcW466o008znbEkk2sYF+YuldMKFjUVSIbc+nNdKVIvVKkN6NQNYynuQXnzMD/D8ENjGZhChOKGYuJkkAW6WA8IWpxJOjVFwk5Wh41FCitSLTBTHgXBKmJcQ0hrRq90wDsLakptw3grqxDqndZz3P8AZ9NfmrfhsOymxrKYho0HiZN9yuyGNvshlzqOo9kPDeGsoMDKbATEOdAl2slx5XNkbRoNY3utaP7IAHoFLmW1GDM6QSfJdFI4rbdtkFcw2NzfyXuDF/AE+gQ1SpJn7jkpaJ7rz/Vj1IWb0FFp/Cs/0up/dO/xsXVlyf8ACj9rf/cu/wAbF1hc+Ts78HgfF7Hpz2bYDUJjQJOGKy9mcNlYXndKtsGV1FhlSuSSoy/mpX1A0m0yhnmyq+zjRuDKje0rUOWoN0EMSCnGpspRSYdHLyoLaqOm0JkrNZL7J7btuOi9OKBs9sryg1w90o2jgXVNWX5hOlKINAlJrJsS1MGUSeR6jVFUuyxF31GtCNp4fDUdXFx6J0kBlQ4twRxmpTHe3A0d+RVec4TDhB5Gy69heN07htMCBNwEq4oaOJBD6behgAjwIUZ4U3orHLS2c100K8ySrnR7O4YG4cf+pF/+EYWLUx5kqTwSQ/zxKEKSYdnmB9YMmM4c0HqQrNV4TRF/ZGOhMKKlgcK1wIpkEGQZNj6pPj/ofnRXjLXlp2JHojaFQ6CT5H6KzFrCS4ASbkkXPmthUjQN8d1VYFW2SeZfQnp4R7hdpHU/d0wpYaqG5Wkaak76T5KZtcncIim7nEI/DEm8rKlxTCuoEe0gzcQben5pecYSte0HGDWrG3db3W+AS44nkFzuEbOuMNKxjUxsC58kre7M4nSV41pJlTMZCySRRJI1C39jOq3EInD02n3jboijN0Q0aXmdoTDD0A27tVs6sAIY0NHxPidVHTJKdIk3YypYk8z6ptwiuXOg76JFSplOeEUDnaY3V4pkJJDarUvHL5rcmKZPMx9SosPQc42BKdu4DVcGNAgXJnmUzaJJN9FfYEfhsI51N+UEzA+KsmC7N023ecx9AmPt6NIQMo6CEspWqRSOL/Y1/DjhLqVZz3CJpkR/1NP0XQ1Sux/GG1sQ5jRYMJnwc0fVXVRkqZ2Yq46PjMFWvh7gaLcixYhj8gfk7iSClzXooheLF1KKOCz04Mc1qMCOaxYmUFRuTCRw5zhDVNR4OG++8BYsQSV0a2MqNOgwS1uY9VpV4m7RsN8FixUqkCxficedyShMRiJHVYsSOTUqGSCeBEkuJNoKGZiMpynyKxYgzBNOvNifArPbXglYsSyerNRp7d7TI0U76jagOYZXC8jQrFilKKo1mjXADVah0mxusWJW6MEMaFDxjEinQeZgkQPErFiaT/U2NXNI56Gc16B0XixRPRR4a5XgeSsWLBCKbUTTaVixFCMMw9BzvdBIGpTnBcMdYBpk9FixWikc82+iwcO7PVXEd2BzNlZuHdm2MMuMlYsR5tmjBdsasZRoiwa35oHEdoWzFMT1NgvFiaEU1bEnNp0hNjeN1H2BgdLJfVxBAP8AEfgFixXUUiVtlp/Cz9qf/dH/ABsXU1ixcmbzO78fwP/Z',
            isClaimed: false,
            vegLocation: 'N5 2HS ',
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
            vegLocation: 'SE8 8JZ',
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