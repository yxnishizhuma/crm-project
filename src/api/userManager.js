import axios from '@/http'
import { getUrl } from './path'

const user = {

  getUserList (data) {
    return axios({
      url: getUrl(`account/manage`),
      method: 'GET',
      params: data
    })
  },
  createdUser (data) {
    return axios({
      url: getUrl(`account/manage`),
      method: 'POST',
      data: data
    })
  },
  updateUser (data) {
    let id = data.id
    return axios({
      url: getUrl(`account/manage/${id}`),
      method: 'PUT',
      data: data
    })
  },
  me (data) {
    return axios({
      url: getUrl(`account/manage/${data}`),
      method: 'GET'
    })
  },
  updateUserPassword (data) {
    let id = data.id
    return axios({
      url: getUrl(`account/password/${id}`),
      method: 'PUT',
      data: data
    })
  }
}

export default user
