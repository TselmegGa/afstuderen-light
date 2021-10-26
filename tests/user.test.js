const request = require('supertest')
const app = require('../app')
const db = require('../model/sequelize')



  describe('Auth tests', () =>{
    let thisDb = db
    let token = null
    beforeAll(async () => {
      await thisDb.sequelize.sync({ force: true })
      await request(app)
        .post('/auth/register')
        .send({
            "firstname":"brake",
            "lastname":"gnewood",
            "email": "bob@2.com",
            "password": "12345678",
            "licence": true,
            "privacy": true,
            "Address": {"streetName": "lindes1", "houseNumber": 18, "city": "hoff", "zipCode": "5569AA"}
        })
        await request(app)
        .put('/users/1')
        .send({
            "role":1,
            "token": token
        })
        let res = await request(app)
        .post('/auth/login')
        .send({
            password: "12345678",
            email: "bob@2.com"
        })
        token = res.body.jwt
    })

    it('should register new user', async () =>{
        const res = await request(app)
        .post('/auth/register')
        .send({
            "firstname":"brake",
            "lastname":"gnewood",
            "email": "bob@2521.com",
            "password": "12345678",
            "licence": true,
            "privacy": true,
            "Address": {"streetName": "lindes2", "houseNumber": 18, "city": "hoff", "zipCode": "5569AA"}
        })
        
      expect(res.statusCode).toEqual(200)
      expect(typeof res.body.model.AddressId).toEqual('number')
    })
    it('should register new user without addrress', async () =>{
      const res = await request(app)
      .post('/auth/register')
      .send({
          "firstname":"brake",
          "lastname":"gnewood",
          "email": "bob@2522.com",
          "password": "12345678",
          "licence": true,  
          "privacy": true
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.model.AddressId).toEqual(null)
  })
    it('should not register new user without firstname', async () =>{
      const res = await request(app)
      .post('/auth/register')
      .send({
          "lastname":"gnewood",
          "email": "bob@2522.com",
          "password": "12345678",
          "licence": true,
          "privacy": true,
          "Address": {"streetName": "lindes3", "houseNumber": 18, "city": "hoff", "zipCode": "5569AA"}
      })
      
    expect(res.statusCode).toEqual(400)
    expect(res.body.error).toEqual("First Name can not be empty!")
  })
  it('should not register new user without lastname', async () =>{
    const res = await request(app)
    .post('/auth/register')
    .send({
        "firstname":"brake",
        
        "email": "bob@2523.com",
        "password": "12345678",
        "licence": true,
        "privacy": true,
        "Address": {"streetName": "linde", "houseNumber": 18, "city": "hoff", "zipCode": "5569AA"}
    })
    expect(res.statusCode).toEqual(400)
    expect(res.body.error).toEqual("Last Name can not be empty!")
})
it("should not register new user without email", async () =>{
  const res = await request(app)
  .post('/auth/register')
  .send({
      "firstname":"brake",
      "lastname":"gnewood",
      "password": "12345678",
      "licence": true,
      "privacy": true,
      "Address": {"streetName": "linde", "houseNumber": 18, "city": "hoff", "zipCode": "5569AA"}
  })
  expect(res.statusCode).toEqual(400)
  expect(res.body.error).toEqual("Email can not be empty!")
})

    it('should login as user', async () =>{
        const res = await request(app)
        .post('/auth/login')
        .send({
            password: "12345678",
            email: "bob@2521.com"
        })
      expect(res.statusCode).toEqual(200)
    })
    

    it('should give error with wrong token', async () =>{
      const res = await request(app)
      .get('/users')
      .send({
          "token": "Nep token"
      })
     
    expect(res.body.error).toEqual('Failed to authenticate token.')
  })
  it('should give 404 status with wrong url', async () =>{
    const res = await request(app)
    .get('/usernames')
    .send({
        "token": "Nep token"
    })
    
    expect(res.statusCode).toEqual(404)
})



it('should get users', async () =>{
  const res = await request(app)
  .get('/users')
  
  expect(res.body.error).toEqual('Failed to find token.')
})
    it('should get a single user', async () =>{
      const res = await request(app)
      .get('/users/1')
      .send({
        "token": token
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.model.firstname).toEqual("brake")
  })
  it('should update a single user', async () =>{
    const res = await request(app)
    .put('/users/1')
    .send({
        "firstname":"bob",
        "token": token
    })

  expect(res.statusCode).toEqual(200)
  expect(res.body.success).toEqual(true)
})
    
    it('should register new car', async () =>{
      const res = await request(app)
      .post('/cars')
      .send({
        "name": "NEW VWM S2",
        "size":0,
        "brand":"vwm",
        "wheelchair":true,
        "price":11.25,
        "token": token
      })
      
    expect(res.statusCode).toEqual(200)
  })
  it('should not register new car without size', async () =>{
    const res = await request(app)
    .post('/cars')
    .send({
      "name": "NEW VWM S2",
      
      "brand":"vwm",
      "wheelchair":true,
      "price":11.25,
      "token": token
    })
    
  expect(res.statusCode).toEqual(400)
})
it('should not register new car without brand', async () =>{
  const res = await request(app)
  .post('/cars')
  .send({
    "name": "NEW VWM S2",
    "size":0,
    "wheelchair":true,
    "price":11.25,
    "token": token
  })
  
expect(res.statusCode).toEqual(400)
})
it('should not register new car without wheelchair setting', async () =>{
  const res = await request(app)
  .post('/cars')
  .send({
    "name": "NEW VWM S2",
    "size":0,
    "brand":"vwm",
    "price":11.25,
    "token": token
  })
  
expect(res.statusCode).toEqual(400)
})
it('should not register new car without price', async () =>{
  const res = await request(app)
  .post('/cars')
  .send({
    "name": "NEW VWM S2",
    "size":0,
    "brand":"vwm",
    "wheelchair":true,
    "token": token
  })
  
expect(res.statusCode).toEqual(400)
})
  it('should get cars', async () =>{
    const res = await request(app)
    .get('/cars')
    .send({
    
      "token": token
    })
    
  expect(res.statusCode).toEqual(200)
})
it('should get a car', async () =>{
  const res = await request(app)
  .get('/cars/1')
  .send({
  
    "token": token
  })
  
expect(res.statusCode).toEqual(200)
})  

it('should update a car', async () =>{
  const res = await request(app)
  .put('/cars/1')
  .send({
  
    "token": token,
    "size": 1
  })
  
expect(res.statusCode).toEqual(200)
})

it('should register new history', async () =>{
  const res = await request(app)
  .post('/history')
  .send({
    "token":token,
    "price":11.24,
    "start":"4445HD",
    "end": "4488HP",
    "startTime": "2016-08-09 04:05:02",
    "endTime": "2016-08-09 04:10:02",
    "distance": 1.22,
    "UserId": 1,
    "CarId":1
  })
  
  
expect(res.statusCode).toEqual(200)
})
it('should get all car history', async () =>{
  const res = await request(app)
  .get('/history/car')
  .send({
    "token":token
  })
expect(res.statusCode).toEqual(200)
})

it('should get a car history', async () =>{
  const res = await request(app)
  .get('/history/car/1')
  .send({
    "token":token
  })

expect(res.statusCode).toEqual(200)
})

it('should get user history', async () =>{
  const res = await request(app)
  .get('/history/user/1')
  .send({
    "token":token
  })
expect(res.statusCode).toEqual(200)
})

it('should not get user history without permission', async () =>{
  await request(app)
        .put('/users/1')
        .send({
          "privacy": false,
            "token": token
        })
  const res = await request(app)
  .get('/history/user/1')
  .send({
    "token":token
  })
expect(res.statusCode).toEqual(400)
expect(res.body.error).toEqual("User must set privacy off to view history" )
})



  it('should delete a single user', async () =>{
    const res = await request(app)
    .delete('/users/1')
    .send({
      "token": token
    })
  expect(res.statusCode).toEqual(200)
})
  })

  
