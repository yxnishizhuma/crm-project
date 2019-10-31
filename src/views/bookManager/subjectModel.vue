<template>
  <div class="subjectModal">
    <Modal
      v-model="ModalPop"
      @on-cancel="cancelBtn"
      @on-ok="okBtn"
      title="Common Modal dialog box title">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="科目中文名称:" prop="subName">
          <Input v-model="formValidate.subjectName" :readonly="true" placeholder="Enter科目中文名称" class="inputWidth"></Input>
        </FormItem>
        <FormItem label="科目英文名称:" prop="subNAme">
          <Input v-model="formValidate.subjectEName" :readonly="readOnly" placeholder="Enter科目英文名称" class="inputWidth"></Input>
        </FormItem>
        <FormItem label="编号" prop="subCode">
          <InputNumber :max="10" :min="1" :readonly="readOnly" v-model="formValidate.subjectNo" placeholder="Enter编号" class="inputWidth"></InputNumber>
        </FormItem>
        <!--<FormItem label="科目级别:" prop="subRank">-->
          <!--<InputNumber :max="10" :min="1" :readonly="readOnly" v-model="formValidate.subjectLevels[0].levelNo" placeholder="Enter科目级别" class="inputWidth"></InputNumber>-->
        <!--</FormItem>-->
        <!--<FormItem label="描述:" prop="subdDesc">-->
          <!--<Input v-model="formValidate.subjectLevels[0].levelDesc" :readonly="readOnly" class="inputWidth" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>-->
        <!--</FormItem>-->
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'subjectModel',
    props:['tableRow','readOnly'],
    // 你这个弹框用的是同一个弹框编辑跟新建，编辑的时候你穿了一个值tableRow，  那你是不是新建的时候也得穿一个过来，新建那肯定就是传一个空对象
    //然后 你才能在页面上输入那些值么，然后你点击确定的时候才能判
    data () {
      return {
        ModalPop: false,
        formValidate:{},
        ruleValidate: {
          subName: [
            { required: true, message: '科目名不能为空', trigger: 'blur' }
          ],
          subNAme: [
            { required: true, message: '英文名不能为空', trigger: 'blur' }
          ],
          subCode: [
            { required: true, message: '编码不能为空', trigger: 'blur' }
          ],
          subRank: [
            { required: true, message: '级别不能为空', trigger: 'blur' }
          ],
          subdDesc: [
            // { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      okBtn () {
        this.$emit('cancelHander')

        console.log(this.formValidate.subjectId,'this.formValidate.subjectId')
        if (this.tableRow.subjectId) {
          this.ModalPop = false
        }else {
          console.log('add')
          this.$emit('getAdd',this.formValidate)
        }

      },
      cancelBtn () {
        this.ModalPop = false
        this.$emit('cancelHander')
      }
    },
    created(){
      console.log(this.tableRow,'this.tableRow')
      this.ModalPop = true;
      this.formValidate = this.tableRow
    },
    mounted () {
    },
    components: {},
  }
</script>

<style lang="scss" type="text/scss" scoped>

</style>

<style>

</style>
