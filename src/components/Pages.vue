<template>
    <div class="page">
      <Page
        :total="count"
        :current="currentCount"
        :page-size="pageSize"
        @on-change="changePage"
        @on-page-size-change="numberPage"
        show-sizer
      />
    </div>
</template>

<script>
  export default {
    name: 'Pages',
    props:{
      count:{
        default: 0,
        type: Number
      },
      currentCount:{
        default: 1,
        type: Number
      },
      pageSize:{
        default: 10,
        type: Number
      }
    },
    data () {
      return {}
    },
    methods: {
      // 页数
      changePage(page){
        console.log(page,'page')
        this.$emit('showchangePage',page)
      },
      //每页显示几条
      numberPage(number){
        console.log(number,'number')
        this.$emit('showNumberPage',number)
      }
    },
    mounted () {
    },
    components: {},
  }
</script>

<style lang="scss" type="text/scss" scoped>
.page {
  float: right;
  margin-top: 20px;
}
</style>

<style>

</style>
