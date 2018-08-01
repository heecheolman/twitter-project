<template>
  <div class="login-body">
    <div class="login-body__logo">
      <logo :logo-style="logoStyle"/>
    </div>
    <div class="login-body__input-body flex-container flex-center flex-column">
      <login-input
        v-for="(component,index) in inputComponents"
        :component="component"
        :key="index" />
    </div>
    <div class="login-body__support-body">
      <support-link
        :label="support.text" />
    </div>
    <div class="login-body__button-body">
      <login-button />
      <join-button />
    </div>
  </div>
</template>
<script>
import Logo from './../molecules/Logo';
import LoginInput from './../molecules/LoginInput';
import SupportLink from './../molecules/SupportLink';
import LoginButton from './../molecules/LoginButton';
import JoinButton from './../molecules/JoinButton';

export default {
  name: 'LoginBox',
  components: {
    Logo,
    LoginInput,
    SupportLink,
    LoginButton,
    JoinButton,
  },
  data: function() {
    return {
      logoStyle: 'logo--login',
      inputComponents: [
        {
          placeholder: '아이디',
          type: 'text',
        },
        {
          placeholder: '패스워드',
          type: 'password',
        },
      ],
      buttonComponents: [
        {
          text: '로그인'
        },
        {
          text: '회원가입'
        },
      ],
      support: { text: '비밀번호를 잊으셨나요?' },
    };
  },
};
</script>
<style scoped>
  .login-body {
    width: 370px;
    height: 550px;
    background-color: #fff;
    border-radius: 10px;
  }
  .login-body__logo {
    width: 100%;
    height: 100px;
    text-align: center;
    padding-top: 30px;
  }
  .login-body__support-body {
    width: 100%;
    height: 30px;
  }
  .login-body__button-body {
    width: 100%;
    height: 220px;
  }
</style>
