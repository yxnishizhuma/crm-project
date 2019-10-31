<template>
<!--科目-->
  <div class="subject">
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
              <Button type="primary" @click="search">查询</Button>
              <Button type="primary" @click="addNew">新增</Button>
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

    </Card>
    <subjectModel
      v-if="isShowSubModal"
      @cancelHander="cancelHander"
      :tableRow="tableRow"
      @getAdd="getAdd"
      :readOnly="readOnly"
    ></subjectModel>
  </div>
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
        readOnly:false,
        tableRow:{},
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
                      this.remove(params.row.subjectId)
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
      //新增
      addNew(){
        this.tableRow = {}
        this.isShowSubModal = true
      //  这个状态为true的时候默认打开的就是那个弹框，他会自己吧tableRow带过去，带到子组件，如果你不置空，他就会吧上一次
      },
      async getAdd(msg){
        let addList = msg;
        // addList.subjectId= Number(new Date()) //加一条id
        let parmas = {
          ...msg
        }
        console.log(msg,'msg')
        console.log(parmas,'parmas')
        await api.bookManage.createdSubject(parmas).then(res => {
            console.log(res,'addddd')
          if (res.ecode== 0 && res.emsg== "ok") {
            this.tablesList.push(addList)
            this.getTableList()
          }else {
            this.$Message.info(res.emsg)
          }

        }).catch(error => {
          console.log(error)
        })


      },
      //查询
      async search (){
        let parmas = this.subName
        await api.bookManage.updateSubject(parmas).then(res => {
          console.log(res,'search')
          if (res.ecode== 0 && res.emsg== "ok") {
            this.getTableList()
          }else {
            this.$Message.info(res.emsg)
          }

        }).catch(error => {
          console.log(error)
        })
      },
      cancelHander(){
        this.isShowSubModal = false
      },
      //查看
      showDetailModal(see){
        this.tableRow = see;
        this.isShowSubModal = true
        this.readOnly = true
      },
      //编辑
      showEditModal (row) {
        // 首先这个是你的父组件，然后弹框是不显示的，你先用v-if把他隐藏掉，然后电机的时候他是不是就相当于重新注册一遍，
        //然后到了弹框组件之后他是不是每次都会触发created这个生命周期，然后你再created的时候让modal的那个属性为true他不就显示了
        this.isShowSubModal = true
        this.tableRow = row
      },
      async getTableList (){
        let params = {
          pageNum:this.currentCount,
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
      async remove (subjectId) {
        console.log(subjectId,'subjectId')
        await api.bookManage.deleteSubject(subjectId).then(res => {
          console.log(res,'llll')
          if (res.ecode == 0 && res.emsg =='ok') {
            console.log('shan')
            this.getTableList()
            // this.tablesList.splice(index, 1);
          }
        })

      }
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
