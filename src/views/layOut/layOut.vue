<template>
  <Layout class="content">
    <Header class="header">后台管理系统</Header>
    <Layout>
      <Sider hide-trigger>
        <MenuLeft></MenuLeft>
      </Sider>
      <Content class="menuContent">
        <router-view></router-view>
      </Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
</template>

<script>
import MenuLeft from '@/views/layOut/menuLeft'
export default {
  name: 'layOut',
  components: {MenuLeft},
  data () {
    return {
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.content {
  .header {
    font-size: 24px;
    color: #fff;
  }
  .menuContent {
    padding: 20px;
  }
}
</style>
