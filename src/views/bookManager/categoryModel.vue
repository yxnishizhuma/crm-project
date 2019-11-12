<template>
  <div class="categoryModel">
    <Modal
      v-model="ModalPop"
      @on-cancel="cancelBtn"
      @on-ok="okBtn"
      title="Common Modal dialog box title">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="类别名称:" prop="textbookName">
          <Input v-model="formValidate.textbookName" :readonly="readOnly" placeholder="Enter科目中文名称" class="inputWidth"></Input>
        </FormItem>
        <FormItem label="教材类型::" prop="textbookType">
          <Input v-model="formValidate.textbookType" :readonly="readOnly" placeholder="Enter科目英文名称" class="inputWidth"></Input>
        </FormItem>
        <FormItem label="所属科目:">
          <Select v-model="formValidate.subjectId" style="width:200px">
            <Option v-for="item in subNameList" :value="item.subjectId" :key="item.subjectId">{{ item.subjectName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="封面图:">
          <input type="file" class="inputWidth" @change="uploadImg"/>
          <img :src="coverImage" alt="" class="coverImage" style="width: 50px;height: 50px;">
        </FormItem>
        <FormItem label="是否对用户可见:">
          <i-switch v-model="formValidate.isVisible" size="large">
            <span slot="open">On</span>
            <span slot="close">Off</span>
          </i-switch>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import api from  "@/api"
export default {
  name: 'categoryModel',
  props: ['tableRow', 'readOnly'],
  data () {
    return {
      coverImage:'',
      subName: '',
      subNameList: [],
      isVisible:true ,
      ModalPop: false,
      formValidate: {
        isVisible:true
      },
      ruleValidate: {
        textbookName: [
          { required: true, message: '科目名不能为空', trigger: 'blur' }
        ],
        textbookType: [
          { required: true, message: '英文名不能为空', trigger: 'blur' }
        ],
        coverUrl: [
          { required: true, message: '编码不能为空', trigger: 'blur', type: 'number'}
        ],
        subRank: [
          { required: true, message: '级别不能为空', trigger: 'blur'}
        ],
        subdDesc: [
          // { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  },
  mounted (){
    this.getTableList()
  },
  methods: {
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
    // 上传图片
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
    okBtn () {
      if (this.tableRow.textbookId) {
        let params = {
          ...this.formValidate,
          coverUrl:this.coverImage
        }
        api.bookManage.editCategoryList(params).then (res => {
          console.log(res,'bianji')
          if (res.ecode === 0) {
            this.ModalPop = false
            this.$emit('addData', this.formValidate.subjectId)
          }else {
            this.$Message.info(res.emsg)
          }
        }).catch(error => {
          console.log(error)
        })
      }else {
        let params = {
          ...this.formValidate,
          coverUrl:this.coverImage
        }
        api.bookManage.creatCategoryList(params).then (res => {
          console.log(res,'xinzneg')
          if (res.ecode === 0) {
            this.ModalPop = false
            this.$emit('addData', this.formValidate.subjectId)
          }else {
            this.$Message.info(res.emsg)
          }
        }).catch(error => {
          console.log(error)
        })
      }

    },
    cancelBtn () {
      this.ModalPop = false
    }
  },
  created () {
    console.log(this.tableRow,'this.tableRow')
    this.ModalPop = true
    this.formValidate = this.tableRow
    this.formValidate.subjectNo = this.formValidate.subjectNo ? this.formValidate.subjectNo : 0
      this.coverImage = this.tableRow.coverUrl ? this.tableRow.coverUrl :''
  },
  components: {}
}
</script>

<style lang="scss" type="text/scss" scoped>
  .categoryModel {
    .coverImage {
      display: block;
      width: 50px;
      height: 50px;
    }
  }
</style>

<style>

</style>
