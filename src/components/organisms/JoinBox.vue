<template>
  <div class="join-body">
    <div class="join-body__logo">
      <logo :logo-style="logoStyle"/>
    </div>
    <div class="flex-container flex-center flex-column">
      <login-input
        v-for="(component,index) in inputComponents"
        :key="index"
        :component="component"
        :data.sync="component.data"/>
    </div>
    <div class="password-check">
      {{ passwordCheck }}
    </div>
    <div class="flex-container flex-center flex-column">
      <button @click="goBack">back</button>
      <button @click="join">join</button>
    </div>
  </div>
</template>
<script>
import Logo from './../molecules/Logo';
import LoginInput from './../molecules/LoginInput';
import Eventbus from './../../lib/Eventbus';

export default {
  name: 'JoinBox',
  components: {
    Logo,
    LoginInput,
  },
  computed: {
    passwordCheck() {
      this.passwordMessage =
      this.inputComponents[2].data === this.inputComponents[3].data ?
        'true' :
        'false';
      return this.passwordMessage;
    },
  },
  data() {
    return {
      logoStyle: 'logo--login',
      inputComponents: [
        {
          placeholder: '이름',
          type: 'text',
          data: '',
        },
        {
          placeholder: '휴대폰번호',
          type: 'text',
          data: '',
        },
        {
          placeholder: '패스워드',
          type: 'password',
          data: '',
        },
        {
          placeholder: '패스워드확인',
          type: 'password',
          data: '',
        },
      ],
      passwordMessage: '',
    }
  },
  methods: {
    goBack() {
      Eventbus.$emit('clickBackButton');
    },
    join() {
      console.log(`이름 : ${this.inputComponents[0].data}`);
      console.log(`폰번 : ${this.inputComponents[1].data}`);
      console.log(`pw : ${this.inputComponents[2].data}`);
      console.log(`pwcheck : ${this.inputComponents[3].data}`);

    },
  },
};
</script>
<style scoped>
  .join-body {
    width: 370px;
    height: 580px;
    background-color: #fff;
    border-radius: 10px;
  }
  .join-body__logo {
    width: 100%;
    height: 100px;
    text-align: center;
    padding-top: 30px;
  }
  .password-check {
    width: 100%;
    text-align: center;
  }
</style>
