//教材管理
const bookManager = [
  // 科目
  {
    path: '/subject',
    name: 'subject',
    component: resolve => require(['@/views/bookManager/subject'], resolve)
  },
  // 类别
  {
    path: '/category',
    name: 'category',
    component: resolve => require(['@/views/bookManager/category'], resolve)
  },
  // 级别
  {
    path: '/level',
    name: 'level',
    component: resolve => require(['@/views/bookManager/level'], resolve)
  },
  // 单元
  {
    path: '/unit',
    name: 'unit',
    component: resolve => require(['@/views/bookManager/unit'], resolve)
  },
  // 教材
  {
    path: '/textbook',
    name: 'textbook',
    component: resolve => require(['@/views/bookManager/textbook'], resolve)
  },
]
export default bookManager
