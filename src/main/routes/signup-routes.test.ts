import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Thalyson',
        email: 'thalyson@email.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
