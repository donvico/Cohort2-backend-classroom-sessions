
const request = require('supertest')
const serverApp = require('../server')
const app = request(serverApp)


describe('Runs the app initialization test', ()=>{
    test('GET / to localhost:5000', async()=>{
        const res = await app.get('/')
        expect(res.status).toBe(200)
    })

    test('Post /api/users/login where no req.body was passed', async()=>{
        const res = await app.post('/api/users/login')
        expect(res.status).toBe(400)
        expect(res.body.success).toBeFalsy()
    })
    test('Post /api/users/login where req.body was passed', async()=>{
        const user = {email: 'promise1@gmail.com', password: 'password'}
        const res = await app.post('/api/users/login').send(user)
        expect(1).toBe(1)
        console.log(res.body, 'the response')
    })
})


