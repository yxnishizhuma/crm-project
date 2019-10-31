import axios from '@/http'
import { getUrl } from './path'
//教材管理
const bookManage = {
  getSubject (data) {
    return axios({
      url: getUrl(`textbook/subjects`),
      method: 'GET',
      params: data
    })
  },
  createdSubject (data) {
    return axios({
      url: getUrl(`textbook/subjects`),
      method: 'POST',
      data: data
    })
  },
  updateSubject (data) {
    let id = data.subjectId
    delete data.subjectId
    return axios({
      url: getUrl(`textbook/subjects/${id}`),
      method: 'PUT',
      data: data
    })
  },
  deleteSubject (id) {
    return axios({
      url: getUrl(`textbook/subjects/${id}`),
      method: 'DELETE'
    })
  }
}

export default bookManage
