import axios from '@/http'
import { getUrl } from './path'

const operations = {

  getReserationClass (data) {
    return axios({
      url: getUrl(`bookings/list`),
      method: 'POST',
      data: data
    })
  },
  getClassLists (data) {
    return axios({
      url: getUrl(`classes/list`),
      method: 'POST',
      data: data
    })
  },
  getHistoryClassLists (data) {
    return axios({
      url: getUrl(`classes/history/list`),
      method: 'POST',
      data: data
    })
  }
}

export default operations
