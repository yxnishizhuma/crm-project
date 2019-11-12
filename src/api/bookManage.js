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
  // 删除
  deleteSubject (id) {
    return axios({
      url: getUrl(`textbook/subjects/${id}`),
      method: 'DELETE'
    })
  },
  // 类别列表
  getCategoryList (date) {
    return axios({
      url: getUrl(`textbook/types`),
      method: 'GET',
      params: date
    })
  },
  // 新建类别
  creatCategoryList (date) {
    return axios({
      url: getUrl(`textbook/types`),
      method: 'POST',
      data: date
    })
  },
  // 封面图上传
  upLoadeImage (date) {
    return axios({
      url: getUrl(`file/upload`),
      method: 'POST',
      data: date
    })
  },
//  编辑
  editCategoryList (date) {
    let textbookId = date.textbookId
    return axios({
      url: getUrl(`textbook/types/${textbookId}`),
      method: 'PUT',
      data: date
    })
  },
//  删除你
  deleteCategoryList (textbookId) {
    return axios({
      url: getUrl(`textbook/types/${textbookId}`),
      method: 'DELETE',
    })
  },
//  级别查询
  getLevelList (date) {
    return axios({
      url: getUrl(`textbook/levels`),
      method: 'GET',
      params: date
    })
  },
//  新增
  addLevelList (date) {
    return axios({
      url: getUrl(`textbook/levels`),
      method: 'POST',
      data: date
    })
},
// 编辑
  editLevelList (date) {
    let levelId = date.levelId
    return axios({
      url: getUrl(`textbook/levels/${levelId}`),
      method: 'PUT',
      data: date
    })
  },
//  删除
  deletelevelList (levelId) {
  return axios({
    url: getUrl(`textbook/levels/${levelId}`),
    method: 'DELETE',
  })
},
}

export default bookManage
