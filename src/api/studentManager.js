import axios from '@/http'
import { getUrl } from './path'

const student = {

  getStudentsList (data) {
    return axios({
      url: getUrl(`students/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}`),
      method: 'POST',
      data: data
    })
  },
  updateStudentInfo (data) {
    return axios({
      url: getUrl(`student/${data.id}`),
      method: 'PUT',
      data: data
    })
  }
}

export default student
