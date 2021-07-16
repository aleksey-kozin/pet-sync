const userService = require('../service/user.service.js')

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      console.log(email);
      const userData = await userService.registration(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }) //  httpOnly: true - cookie cannot be changed from the browser
      return res.json(userData)
    } catch (error) {
      console.log(error)
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {}
  }
  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async activate(req, res, next) {
    try {
    } catch (error) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }
  async getUsers(req, res, next) {
    try {
      res.json(['1', '2', '3'])
    } catch (error) {}
  }
}
module.exports = new UserController()
