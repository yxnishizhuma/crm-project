<template>
  <!--类别-->
  <div class="level">
    <Card>
      <Row class="subject">
        <Crumb title="级别搜索"></Crumb>
        <Row class="search">
          <Form>
            <Col span="18">
              <FormItem label="所属科目:">
                <Select v-model="subjectName" style="width:200px" @on-change="getCategoryList">
                  <Option v-for="item in subNameList" :value="item.subjectId" :key="item.subjectId">{{ item.subjectName }}</Option>
                </Select>
              </FormItem>
              <FormItem label="所属类别:">
                <Select v-model="categoryName" style="width:200px">
                  <Option v-for="item in categoryList" :value="item.textbookId" :key="item.textbookId">{{ item.textbookName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <Button type="primary" @click="getLevelList">查询</Button>
              <Button type="primary" @click="addNew">新增</Button>
            </Col>
          </Form>
        </Row>
        <Crumb title="类别列表"></Crumb>
        <Table border :columns="columnsTablesList" :data="tablesList"></Table>
        <Pages

        >
        </Pages>
      </Row>

    </Card>
    <levelModel
      v-if="showLevelModel"
      @toCloseModalPop="toCloseModalPop"
      :editRow="editRow"
    ></levelModel>
  </div>
</template>

<script>
  import api from  "@/api"
  import Crumb from '@/components/Crumb'
  import Pages from '@/components/Pages'
  import levelModel from '@/views/bookManager/levelModel'
  export default {
    name: 'category',
    data () {
      return {
        editRow:{},
        showLevelModel:false,
        subjectName:'',
        categoryName:'',
        fatherId:'',
        readOnly: false,
        columnsTablesList: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '级别名称',
            key: 'levelName',
          },
          {
            title: '编号',
            key: 'levelNo'
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
                      // this.showDetailModal(params.row)
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
                      this.remove(params.row.levelId)
                    }
                  }
                }, '禁用')
              ]);
            }
          }
        ],
        tablesList: [],
        subNameList:[],
        categoryList:[]
      }
    },
    methods: {
      //关闭弹框
      toCloseModalPop (){
        this.showLevelModel = false;
        this.getLevelList()
      },
      //编辑
      showEditModal (row) {
        this.editRow = row
          this.showLevelModel = true;
      },
      //查询
      getLevelList(){
        let data = {
          fatherId: this.categoryName,
          pageNum: 1,
          pageSize: 1000
        }
        api.bookManage.getLevelList (data).then (res => {
          console.log(res,'查询')
          if (res.ecode === 0) {
            if (res.data.list) {
              this.tablesList = res.data.list
            }else {
              this.tablesList = []
            }
          }
        })
      },
      //新增
      addNew(){
        this.
        this.showLevelModel = true;

      },
      remove (levelId) {
        console.log(levelId, 'levelId')
        this.$Modal.confirm({
          title: '确定禁用',
          content: '<p>确定禁用吗？</p>',
          onOk: () => {
            api.bookManage.deletelevelList(levelId).then(res => {
              console.log(res, 'shan')
              if (res.ecode === 0 ) {
                this.$Message.info('禁用成功');
                console.log('shan')
                this.getLevelList()
              }else {
                this.$Message.info(res.emsg)
              }
            })
          },
          onCancel: () => {
            this.$Message.info('取消禁用');
          }
        });

      },
      changeSelct (e){
        this.getCategoryList(e)
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
      //所属类别
      getCategoryList () {
        let date = {
          fatherId: this.subjectName,
          pageNum: 1,
          pageSize: 1000
        }
        api.bookManage.getCategoryList(date).then (res => {
          if (res.ecode === 0) {
            this.categoryList = res.data.list
          }
        })
      },
    },
    created () {
    this.getTableList()
    },
    components: {
      Crumb,
      Pages,
      levelModel
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .level {
    .search {
      height: 100%;
      margin-top: 20px;
    }
  }
</style>

<style>

</style>
