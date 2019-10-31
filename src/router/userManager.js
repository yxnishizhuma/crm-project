// 用户中心
const userManager = [
  // 用户管理
  {
    path: '/userCenter',
    name: 'userCenter',
    component: resolve => require(['@/views/userManager/userCenter'], resolve)
  },
]
export default userManager
