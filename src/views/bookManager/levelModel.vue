<template>
  <div class="levelModel">
    <Modal
      v-model="ModalPop"
      @on-cancel="cancelBtn"
      @on-ok="okBtn"
      title="Common Modal dialog box title">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="级别名称:" prop="textbookName">
          <Input v-model="formValidate.levelName" :readonly="readOnly" placeholder="Enter科目中文名称" class="inputWidth"></Input>
        </FormItem>
        <FormItem label="所属科目:" prop="textbookName">
          <Select v-model="formValidate.subjectName" style="width:200px" @on-change="getCategoryList">
            <Option v-for="item in subNameList" :value="item.subjectId" :key="item.subjectId">{{ item.subjectName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属类别:" prop="textbookName">
          <Select v-model="formValidate.textbookId" style="width:200px">
            <Option v-for="item in categoryList" :value="item.textbookId" :key="item.textbookId">{{ item.textbookName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="级别编号" prop="levelNo">
          <InputNumber :max="10" :min="1" :readonly="readOnly" v-model="formValidate.levelNo" placeholder="Enter编号" class="inputWidth"></InputNumber>
        </FormItem>
        <FormItem label="课前预习资料:" prop="textbookType">
          <input type="file"  class="inputWidth" @change="uploadImg"></input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import api from  "@/api"
  export default {
    name: 'levelModel',
    props: [ 'readOnly','editRow'],
    data () {
      return {
        coverImage:'',
        categoryList:[],
        subjectName: '',
        categoryName:'',
        subNameList: [],
        ModalPop: false,
        formValidate: {},
        ruleValidate: {
          textbookName: [
            { required: true, message: '科目名不能为空', trigger: 'blur' }
          ],
          textbookType: [
            { required: true, message: '英文名不能为空', trigger: 'blur' }
          ],
          coverUrl: [
            { required: true, message: '编码不能为空', trigger: 'blur'}
          ],
          levelNo: [
            { required: true, message: '级别不能为空', trigger: 'blur',type: 'number'}
          ],
        }
      }
    },
    mounted (){
      // this.getTableList()
    },
    methods: {
      okBtn () {
        if (this.editRow.levelId) {
        //    编辑
          let data = {
            levelName:this.formValidate.levelName,
            levelNo:this.formValidate.levelNo,
            textbookId:this.formValidate.textbookId,
            levelId:this.formValidate.levelId
          }
          api.bookManage.editLevelList (data).then(res => {
            console.log(res,'编辑')
            if (res.ecode === 0) {
              this.ModalPop=false;
              this.$emit('toCloseModalPop',this.formValidate.textbookId)
            }else {
              this.$Message.info(res.emsg)
            }
          })
        }else {
        //  新增
          let data = {
            levelName:this.formValidate.levelName,
            levelNo:this.formValidate.levelNo,
            textbookId:this.formValidate.textbookId
          }
          api.bookManage.addLevelList (data).then(res => {
            console.log(res,'xinz')
            if (res.ecode === 0) {
              this.ModalPop=false;
              this.$emit('toCloseModalPop',this.formValidate.textbookId)
            }
          })
        }

      },
      cancelBtn () {
        this.$emit('toCloseModalPop')
      },
      uploadImg (e) {
        console.log(e)
        // let data = {
        //   file:e.target.files[0],
        //   category:'image'
        // }
        //通过FormData构造函数创建一个空对象
        let formdata=new FormData();
        //可以通过append()方法来追加数据
        formdata.append("file",e.target.files[0])
        formdata.append("category","image")
        api.bookManage.upLoadeImage(formdata).then(res => {
          console.log(res,'shancghaun')
          this.coverImage = res.data.fileUrl
        })
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
      getCategoryList (e) {
        let date = {
          fatherId: e,
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
      this.ModalPop=true;
      this.getTableList()
      this.getCategoryList()
      this.formValidate.levelNo = this.formValidate.levelNo ? this.formValidate.levelNo : 0
      console.log(this.editRow,'editRoweditRow')
      this.formValidate = this.editRow
    },
    components: {}
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .levelModel {
    .coverImage {
      display: block;
      width: 50px;
      height: 50px;
    }
  }
</style>

<style>

</style>

