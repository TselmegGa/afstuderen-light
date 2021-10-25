const request = require('supertest')
const app = require('../app')
const db = require('../model/sequelize')



  describe('GET /users', () =>{
    let thisDb = db
    
    beforeAll(async () => {
        await thisDb.sequelize.sync({ force: true })
    })
    it('respond with json', async () =>{
        const res = await request(app)
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
      expect(res.statusCode).toEqual(200)
    })

    it('respond with json', async () =>{
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
        const res = await request(app)
        .post('/auth/login')
        .send({
            password: "12345678",
            email: "bob@2.com"
        })
      expect(res.statusCode).toEqual(200)
    })


  })

  
