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
    <modal v-if="showErrorModal" @close="showErrorModal = false">
      <h3 slot="header" class="modal-header--base modal-header--err">
        로그인 실패!
      </h3>
      <p slot="body" class="modal-body--base">
        입력한 정보를 다시 확인해주세요 : )
      </p>
      <button slot="button" @click="showErrorModal = false" class="modal-button--base">
        확인
      </button>
    </modal>
  </div>
</template>
<script>
import Logo from './../molecules/Logo';
import LoginInput from './../molecules/LoginInput';
import SupportLink from './../molecules/SupportLink';
import LoginButton from './../molecules/LoginButton';
import JoinFormButton from './../molecules/JoinFormButton';
import Modal from './../molecules/Modal';

import Eventbus from './../../lib/Eventbus';
import Auth from './../../api';

import _ from 'lodash';

export default {
  name: 'LoginBox',
  components: {
    Logo,
    LoginInput,
    SupportLink,
    LoginButton,
    JoinFormButton,
    Modal,
  },
  created() {
    Eventbus.$on('login', this.login);
  },
  computed: {
    phoneNumberArea() {
      return this.inputComponents[0].data;
    },
  },
  watch: {
    phoneNumberArea: _.debounce(function() {
      const phoneNumberCheck = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
      this.inputComponents[0].data = this.phoneNumberArea.replace(/ /gi, '').split('-').join('');
      this.isPhoneNumber = phoneNumberCheck.test(this.phoneNumberArea);
      if(this.isPhoneNumber) {
        this.inputComponents[0].placeholder = '유효한 형식입니다!';
      } else if(!this.isPhoneNumber) {
        this.inputComponents[0].placeholder = '형식이 틀립니다!';
      }
      if(this.phoneNumberArea.length === 0) {
        this.inputComponents[0].placeholder = '휴대폰 번호';
      }
    }, 300),
  },
  data() {
    return {
      logoStyle: 'logo--login',
      inputComponents: [
        {
          placeholder: '휴대폰 번호',
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
      isPhoneNumber: false,
      // isLogin: false,
      showErrorModal: false,
    };
  },
  methods: {
    async login() {
      if(this.isPhoneNumber && this.inputComponents[0].data.length !== 0 && this.inputComponents[1].data.length !== 0) {
        const userId = this.inputComponents[0].data;
        const userPw = this.inputComponents[1].data;

        await Auth.login.checkId(userId);
        if(Auth.login.hasId) {
          await Auth.login.checkPw(userId, userPw);
          if(Auth.login.isLogin) {

            // login true then routing
            console.log('login true');

          } else { this.showErrorModal = true; }
        } else { this.showErrorModal = true; }
      } else { this.showErrorModal = true; }
      // if(this.isPhoneNumber && this.inputComponents[0].data.length !== 0) {
      //   axios.get('/api/phone-numbers/' + this.inputComponents[0].data, {
      //     params: { phoneNumber: this.inputComponents[0].data, },
      //   })
      //     .then((result) => {
      //       if(this.inputComponents[1].data.length !== 0 && result.data.length !== 0) {
      //         return this.passwordCheck();
      //       }
      //     })
      //     // db 의 패스워드와 입력된 패스워드가 같다면 this.isLogin 에 저장
      //     .then((dbPassword) => {
      //       this.isLogin = dbPassword.data[0].user_password === this.inputComponents[1].data;
      //       this.showErrorModal = !this.isLogin;
      //       if(this.isLogin) {
      //         // 로그인 되었을 시 해야할 행동
      //       }
      //     })
      //     .catch(() => {
      //       this.showErrorModal = true;
      //     });
      // } else {
      //   this.showErrorModal = true;
      // }
    },

    // passwordCheck() {
    //   const passwordPromise = axios.get(`/api/password/${this.inputComponents[0].data}/${this.inputComponents[1].data}`, {
    //     params: {
    //       phoneNumber: this.inputComponents[0].data,
    //       userPassword: this.inputComponents[1].data,
    //     },
    //   });
    //   return passwordPromise;
    // }
  }
};
</script>
<style scoped>
  .login-body {
    width: 370px;
    height: 500px;
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
    height: 50px;
  }
  .login-body__button-body {
    width: 100%;
    height: 200px;
  }

  .modal-header--base {
    padding: 10px 0;
  }

  .modal-header--err {
    color: #ff2128;
    border-bottom: 2px solid #ff2128;
  }

  .modal-body--base {
    line-height: 180%;
    text-align: center;
    font-size: 0.8rem;
    color: #737373;
  }

  .modal-button--base {
    width: 80px;
    height: 35px;
    outline: none;
    cursor: pointer;
    border: 1px solid #efefef;
    border-radius: 30px;
    font-size: 0.7rem;
    font-weight: 600;
    background-color: #fff;
    color: #737373;
    transition: 0.3s;
  }
  .modal-button--base:hover {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
</style>
