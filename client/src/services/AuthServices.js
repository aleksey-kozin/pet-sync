import instance from '../http/index'
import { AxiosResponse } from 'axios'
// import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
  static async login(email, password) {
    return instance.post('/login', { email, password })
  }

  static async registration(email, password) {
    return instance.post('/registration', { email, password })
  }

  static async logout() {
    return instance.post('/logout')
  }
}
