<template>
  <div class="login-body">
    <div class="login-body__logo">
      <logo :logo-style="logoStyle"/>
    </div>
    <div class="flex-container flex-center flex-column">
      <login-input
        v-for="(component,index) in inputComponents"
        :key="index"
        :component="component"
        :data.sync="component.data" />
    </div>
    <div class="login-body__support-body flex-container flex-center">
      <support-link
        :label="support.text" />
    </div>
    <div class="login-body__button-body flex-container flex-center flex-column">
      <login-button />
      <join-form-button />
    </div>
  </div>
</template>
<script>
import Logo from './../molecules/Logo';
import LoginInput from './../molecules/LoginInput';
import SupportLink from './../molecules/SupportLink';
import LoginButton from './../molecules/LoginButton';
import JoinFormButton from '../molecules/JoinFormButton';

import Eventbus from './../../lib/Eventbus';
import axios from 'axios';

export default {
  name: 'LoginBox',
  components: {
    Logo,
    LoginInput,
    SupportLink,
    LoginButton,
    JoinFormButton,
  },
  created() {
    Eventbus.$on('login', this.login);
  },
  data() {
    return {
      logoStyle: 'logo--login',
      inputComponents: [
        {
          placeholder: '아이디',
          type: 'text',
          data: '',
        },
        {
          placeholder: '패스워드',
          type: 'password',
          data: '',
        },
      ],
      buttonComponents: [
        { text: '로그인' },
        { text: '회원가입' },
      ],
      support: { text: '비밀번호를 잊으셨나요?' },
    };
  },
  methods: {
    login() {
      console.log('id' + this.inputComponents[0].data);
      console.log('pw' + this.inputComponents[1].data);
    },
  }
};
</script>
<style scoped>
  .login-body {
    width: 370px;
    height: 580px;
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
    height: 70px;
  }
  .login-body__button-body {
    width: 100%;
    height: 230px;
  }
</style>
