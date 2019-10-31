// 运营管理
const operationsManager = [
  // 预约管理
  {
    path: '/appointment',
    name: 'appointment',
    component: resolve => require(['@/views/operationsManager/appointment'], resolve)
  },
  // 课中管理
  {
    path: '/classing',
    name: 'classing',
    component: resolve => require(['@/views/operationsManager/classing'], resolve)
  },
  // 课后管理
  {
    path: '/classed',
    name: 'classed',
    component: resolve => require(['@/views/operationsManager/classed'], resolve)
  },

]
export default operationsManager
