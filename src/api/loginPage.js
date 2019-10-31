import axios from '@/http'
import { getUrl } from './path'

const loginPage = {

  uploadFile (data) {
    return axios({
      url: getUrl(`file/upload`),
      method: 'POST',
      data: data
    })
  },
  login (data) {
    return axios({
      url: getUrl(`login`),
      method: 'POST',
      data: data
    })
  }
}

export default loginPage
