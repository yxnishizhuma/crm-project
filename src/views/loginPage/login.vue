<template>
  <div class="login" @keydown.enter="showCaptcha('loginForm')">
    <!--<img class="logoImg" src="../assets/logo.png" alt />-->
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="command" :rules="rules">
            <FormItem prop="username">
              <Input v-model="command.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon type="ios-contact" :size="18" />
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="command.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon type="ios-unlock" :size="18" />
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="showCaptcha('loginForm')" :loading="loading" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
  import api from '@/api'
  export default {
    data() {
      return {
        loading: false,
        command: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: "账号不能为空", trigger: "blur" }
          ],
          password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
        }
      };
    },
    mounted(){

    },
    methods: {
       showCaptcha(loginForm) {
        console.log(loginForm,'lll')
        this.$refs[loginForm].validate(valid => {
          console.log(valid,'vak')
          if (valid) {
            let params = this.command;
            console.log(params,'params')
             api.loginPage.login(params).then(res => {
              console.log(res, 'l;l;')
              if (res.ecode === 0) {
                this.$Message.success("Success!");
                localStorage.setItem('token', res.data.user.token)
                localStorage.setItem('ME', res.data.user.id)
                this.$router.push('/')
              }
            }).catch(err => {

            })

          } else {
            this.$Message.error("登录失败");
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .logoImg {
    width: 130px;
    height: 130px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 19%;
  }
  .login-con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    width: 400px;
    box-sizing: border-box;
    border: 1px solid #eceff5;
  }
  .login-con-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
  }
  .login-con .form-con {
    padding: 10px 0 0;
  }
  .login-con .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
  .login-con .login-tip99 {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
</style>
