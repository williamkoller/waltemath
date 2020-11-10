import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const { email, password } = request.all()

    const userExists = await User.query().where('email', email).first()

    if (userExists) {
      return response.send({
        message: 'This user alrealdy exists',
      })
    }

    const user = await User.create({
      email,
      password,
    })

    return response.status(201).send(user.toJSON())
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = request.all()

      const token = await auth.use('api').attempt(email, password)
      return token.toJSON()
    } catch (error) {
      return response.status(400).send({
        message: 'This request not performed',
        error: error.stack,
      })
    }
  }
}
