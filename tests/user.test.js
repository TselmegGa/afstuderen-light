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
            "address": {"streetName": "linde", "houseNumber": 18, "city": "hoff", "zipCode": "5569AA"}
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
            "email": "bob@2523.com",
            "password": "12345678",
            "licence": true,
            "privacy": true,
            "address": {"streetName": "linde", "houseNumber": 18, "city": "hoff", "zipCode": "5569AA"}
        })
      expect(res.statusCode).toEqual(200)
    })

    it('respond with json', async () =>{
        const res = await request(app)
        .post('/auth/login')
        .send({
            password: "12345678",
            email: "bob@2523.com"
        })
      expect(res.statusCode).toEqual(200)
    })
    it('should get users', async () =>{
        const res = await request(app)
        .get('/users')
        .send({
            "token": token
        })
        
      expect(res.statusCode).toEqual(200)
    })

    it('should get users', async () =>{
      const res = await request(app)
      .get('/users')
      .send({
          "token": "Nep token"
      })
      
    expect(res.body.message).toEqual('Failed to authenticate token.')
  })

    it('should register new user', async () =>{
      const res = await request(app)
      .get('/users/1')
      .send({
        "token": token
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.model.firstname).toEqual("brake")
  })
  it('should register new user', async () =>{
    const res = await request(app)
    .put('/users/1')
    .send({
        "firstname":"bob",
        "token": token
    })

  expect(res.statusCode).toEqual(200)
  expect(res.body.success).toEqual(true)
})
    it('respond with json', async () =>{
        const res = await request(app)
        .delete('/users/1')
        .send({
          "token": token
        })
      expect(res.statusCode).toEqual(200)
    })


  })

  
