<template>
<!--科目-->
  <Card>
    <Row class="subject">
      <Crumb title="科目搜索"></Crumb>
      <Row class="search">
        <Form>
          <Col span="18">
            <FormItem label="科目名称:">
              <Input v-model="subName" placeholder="请输入科目名称..." style="width:200px" />
            </FormItem>
          </Col>
          <Col span="6">
            <Button type="primary">查询</Button>
            <Button type="primary">新增</Button>
          </Col>
        </Form>
      </Row>
      <Crumb title="科目列表"></Crumb>
      <Table border :columns="columnsTablesList" :data="tablesList"></Table>
      <Pages
      @showchangePage="showchangePage"
      @showNumberPage="showNumberPage"
      :count="total"
      :current="currentCount"
      :pageSize="pageSize"
      >
      </Pages>
    </Row>
    <subjectModel></subjectModel>
  </Card>


</template>

<script>
  import api from "@/api"
  import Crumb from '@/components/Crumb'
  import Pages from '@/components/Pages'
  import subjectModel from '@/views/bookManager/subjectModel'
  export default {
    name: 'subject',
    data () {
      return {
        currentCount: 1,
        total:0,
        pageSize: 10,
        subName:'',
        columnsTablesList: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '科目名称',
            key: 'subjectName',
          },
          {
            title: '英文名称',
            key: 'subjectEName'
          },
          {
            title: '编号',
            key: 'subjectNo'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '禁用')
              ]);
            }
          }
        ],
        tablesList: []
      }
    },
    methods: {
      async getTableList (){
        let params = {
          pageNum:this.currentCount ,
          pageSize: this.pageSize
        }
        await api.bookManage.getSubject(params).then(res => {
          this.total = res.data.total;
          this.tablesList = res.data.list;

        })
      },
      showchangePage(page){ // 这个是点击页码翻页
        console.log(page,'pagepage')
        this.currentCount = page
        this.getTableList()
      },
      showNumberPage(number){ // 这个是一页多少条数据
        console.log(number,'numbernumber')
        this.currentCount = 1
         this.pageSize= number
        this.getTableList()
      },
    },
    created () { // 记住请求数据尽量在created   我再说第二遍，你就等着回去抽你
      this.getTableList()
    },
    components: {
      Crumb,
      Pages,
      subjectModel
    },
  }
</script>

<style lang="scss" type="text/scss" scoped>
.subject {
  .search {
    height: 100%;
    margin-top: 20px;
  }
}
</style>

<style>

</style>
