<template>
  <Row>
    <Col span="8">
      <Menu :theme="theme2" active-name="1-2" :open-names="['1']" style="width: 200px">
        <Submenu :name="titles.name" v-for="titles in menuTxt">
          <template slot="title">
            <Icon type="ios-paper" />
            {{titles.title}}
          </template>
          <MenuItem v-for="titleTxt in titles.menuTitle" :name="titleTxt.name" :to="titleTxt.path">{{titleTxt.title}}</MenuItem>

        </Submenu>
      </Menu>
    </Col>

  </Row>
</template>

<script>
  export default {
    name: 'menuLeft',
    data () {
     return {
       theme2: 'dark',
       menuTxt:[
         {
           name:'bookManage',
           title:'教材管理',
           menuTitle:[
             {name:'subject',title:'科目',path:'/subject'},
             {name:'category',title:'类别',path:'/category'},
             {name:'level',title:'级别',path:'/level'},
             {name:'unit',title:'单元',path:'/unit'},
             {name:'textbook',title:'教材',path:'/textbook'},
           ]
         },
         {
           name:'operationsManager',
           title:'运营管理',
           menuTitle:[
             {name:'appointment ',title:'预约管理',path:'/appointment'},
             {name:'classing',title:'课中管理',path:'/classing'},
             {name:'classed',title:'课后管理',path:'/classed'}
           ]
         },
         {
           name:'adManager',
           title:'广告管理',
           menuTitle:[
             {name:'appBanner',title:'AppBanner',path:'/appBanner'},
             {name:'appOrderPage',title:'App引导页',path:'/appOrderPage'},
             {name:'foreignBanner',title:'外教Banner',path:'/foreignBanner'},
             {name:'masterBanner',title:'主站Banner',path:'/masterBanner'},
           ]
         },
         {
           name:'studentManager',
           title:'学生管理',
           menuTitle:[
             {name:'studentMessage',title:'学生信息',path:'/studentMessage'},
           ]
         },
         {
           name:'userManager',
           title:'用户管理',
           menuTitle:[
             {name:'userCenter',title:'用户中心',path:'/userCenter'},
           ]
         },
       ]

      }
    },
    methods: {},
    mounted () {},
    components: {},
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>

<style>

</style>
