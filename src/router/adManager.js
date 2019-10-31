// 广告管理
const adManager = [
  // AppBanner
  {
    path: '/appBanner',
    name: 'appBanner',
    component: resolve => require(['@/views/adManager/appBanner'], resolve)
  },
  // App引导页
  {
    path: '/appOrderPage',
    name: 'appOrderPage',
    component: resolve => require(['@/views/adManager/appOrderPage'], resolve)
  },
  // 外教Banner
  {
    path: '/foreignBanner',
    name: 'foreignBanner',
    component: resolve => require(['@/views/adManager/foreignBanner'], resolve)
  },
  //主站Banner
  {
    path: '/masterBanner',
    name: 'masterBanner',
    component: resolve => require(['@/views/adManager/masterBanner'], resolve)
  },

]
export default adManager

