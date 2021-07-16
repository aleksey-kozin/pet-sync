const UserModel = require('../db/models/user.model.js')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service.js')

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    })
    await mailService.sendActivationMail()
  }
}

module.exports = new UserService()
