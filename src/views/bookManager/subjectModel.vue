<template>

  <Modal
    v-model="modal1"
    title="Common Modal dialog box title"
    @on-ok="okBtn"
    @on-cancel="cancelBtn">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="科目中文名称:" prop="subName">
        <Input v-model="formValidate.subName" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="科目英文名称:" prop="subNAme">
        <Input v-model="formValidate.subNAme" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="编号" prop="subCode">
        <Input v-model="formValidate.subCode" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="科目级别:" prop="subRank">
        <Input v-model="formValidate.subRank" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="描述:" prop="subdDesc">
        <Input v-model="formValidate.subdDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>


    </Form>
  </Modal>
</template>

<script>
  export default {
    name: 'subjectModel',
    data () {
      return {
        modal1: true,
        formValidate:{
          subName:'',
          subNAme:'',
          subCode:'',
          subRank:'',
          subdDesc:'',

        },
        ruleValidate: {
          subName: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          subNAme: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          subCode: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          subRank: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          subdDesc: [
            { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      okBtn () {
        this.$Message.info('Clicked ok');
      },
      cancelBtn () {
        this.$Message.info('Clicked cancel');
      }
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
