import instance from '../http/index'
import { AxiosResponse } from 'axios'
// import {AuthResponse} from "../models/response/AuthResponse";
// import {IUser} from "../models/IUser";

export default class UserService {
  static fetchUsers() {
    return instance.get('/users')
  }
}
 