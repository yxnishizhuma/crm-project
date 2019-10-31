import axios from '@/http'
import { getUrl } from './path'

const advertising = {

  getAppWelcomList (data) {
    return axios({
      url: getUrl(`ad/welcomes`),
      method: 'GET',
      params: data
    })
  },
  getTeacherNannerList (data) {
    return axios({
      url: getUrl(`ad/teacher/banners`),
      method: 'GET',
      params: data
    })
  },
  getAppBannerList (data) {
    return axios({
      url: getUrl(`ad/student/banners`),
      method: 'GET',
      params: data
    })
  },
  getPortalBannerList (data) {
    return axios({
      url: getUrl(`ad/portal/banners`),
      method: 'GET',
      params: data
    })
  },
  createAppBannerList (data) {
    return axios({
      url: getUrl(`ad/student/banners`),
      method: 'POST',
      data: data
    })
  },
  createAppGuideList (data) {
    return axios({
      url: getUrl(`ad/welcomes`),
      method: 'POST',
      data: data
    })
  },
  createTeacherBannerList (data) {
    return axios({
      url: getUrl(`ad/teacher/banners`),
      method: 'POST',
      data: data
    })
  },
  createPortalBannerList (data) {
    return axios({
      url: getUrl(`ad/portal/banners`),
      method: 'POST',
      data: data
    })
  },
  deleteAppGuide (data) {
    return axios({
      url: getUrl(`ad/welcomes/${data}`),
      method: 'DELETE'
    })
  },
  deleteAppBanner (data) {
    return axios({
      url: getUrl(`ad/student/banners/${data}`),
      method: 'DELETE'
    })
  },
  deleteTeacherBanner (data) {
    return axios({
      url: getUrl(`ad/teacher/banners/${data}`),
      method: 'DELETE'
    })
  },
  deletePortalBanner (data) {
    return axios({
      url: getUrl(`ad/portal/banners/${data}`),
      method: 'DELETE'
    })
  }
}

export default advertising
