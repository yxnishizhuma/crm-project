<template>
    <!--类别-->
  <div class="category">
    <Card>
      <Row class="subject">
        <Crumb title="科目搜索"></Crumb>
        <Row class="search">
          <Form>
            <Col span="18">
              <FormItem label="所属科目:">
                <Select v-model="subName" style="width:200px">
                  <Option v-for="item in subNameList" :value="item.subjectId" :key="item.value">{{ item.subjectEName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <Button type="primary" @click="getCategoryList">查询</Button>
              <Button type="primary" @click="addNew">新增</Button>
            </Col>
          </Form>
        </Row>
        <Crumb title="类别列表"></Crumb>
        <Table border :columns="columnsTablesList" :data="tablesList"></Table>
        <Pages
          @showchangePage="showchangePage"
          @showNumberPage="showNumberPage"
          :count="total"
          :current="pageNum"
          :pageSize="pageSize"
        >
        </Pages>
      </Row>

    </Card>
    <categoryModel
      v-if="isShowSubModal"
      @cancelHander="cancelHander"
      :tableRow="tableRow"
      @addData="getAdd"
      :readOnly="readOnly"
    ></categoryModel>
  </div>
</template>

<script>
import api from  "@/api"
import Crumb from '@/components/Crumb'
import Pages from '@/components/Pages'
import categoryModel from '@/views/bookManager/categoryModel'
export default {
  name: 'category',
  data () {
    return {
      readOnly: false,
      tableRow: {},
      pageNum: 1,
      total: 0,
      pageSize: 10,
      subName: '',
      subNameList: [],
      columnsTablesList: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '类别名称',
          key: 'textbookName',
        },
        {
          title: '类别',
          key: 'textbookType'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
                    this.showDetailModal(params.row)
                  }
                }
              }, '查看'),
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
                    // 记住了，
                    // 以后这种光写show不行，
                    this.showEditModal(params.row)

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
                    console.log(params,'params')
                    this.remove(params.row.textbookId)
                  }
                }
              }, '禁用')
            ]);
          }
        }
      ],
      tablesList: [],
      isShowSubModal: false
    }
  },
  methods: {
    // 新增
    addNew () {
      this.tableRow = {}
      this.isShowSubModal = true
    },
    getAdd (msg) {
      this.cancelHander()
      this.subName = msg
      this.getCategoryList()
    },
    // 查询
    async search () {
    },
    cancelHander () {
      this.isShowSubModal = false
    },
    // 查看
    showDetailModal (see) {
      this.tableRow = see;
      this.isShowSubModal = true
      this.readOnly = true
    },
    // 编辑
    showEditModal (row) {
      console.log(row,'bianji')
      this.tableRow = row
      this.isShowSubModal = true
    },
    // table列表
    getCategoryList () {
      let date = {
        fatherId: this.subName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      api.bookManage.getCategoryList(date).then (res => {
        if (res.ecode === 0) {
          this.total = res.data.total
          if (res.data.list) {
            this.tablesList = res.data.list
          } else {
            this.tablesList = []
          }
        }
      })
    },
    // 所属科目
    async getTableList () {
      let params = {
        pageNum: 1,
        pageSize: 1000
      }
      await api.bookManage.getSubject(params).then(res => {
        this.subNameList = res.data.list
      })
    },
    showchangePage (page) { // 这个是点击页码翻页
      console.log(page,'pagepage')
      this.pageNum = page
      this.getTableList()
    },
    showNumberPage (number) { // 这个是一页多少条数据
      console.log(number, 'numbernumber')
      this.pageNum = 1
      this.pageSize = number
      this.getCategoryList()
    },
    remove (textbookId) {
      console.log(textbookId, 'subjectId')
      this.$Modal.confirm({
        title: '确定禁用',
        content: '<p>确定禁用吗？</p>',
        onOk: () => {
          api.bookManage.deleteCategoryList(textbookId).then(res => {
            console.log(res, 'llll')
            if (res.ecode === 0 ) {
              this.$Message.info('禁用成功');
              console.log('shan')
              this.getCategoryList()
              // this.tablesList.splice(index, 1);
            }
          })
        },
        onCancel: () => {
          this.$Message.info('取消禁用');
        }
      });

    }
  },
  created () { // 记住请求数据尽量在created   我再说第二遍，你就等着回去抽你
    this.getTableList()
  },
  components: {
    Crumb,
    Pages,
    categoryModel
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.category {
  .search {
    height: 100%;
    margin-top: 20px;
  }
}
</style>

<style>

</style>
