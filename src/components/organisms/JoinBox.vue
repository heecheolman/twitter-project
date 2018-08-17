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
    <div class="password-check-wrap">
      <transition name="fade">
        <span
          v-if="this.inputComponents[3].data.length !== 0"
          class="password-check"
          :class="messageColor">
          {{ messageType }}
        </span>
      </transition>
    </div>
    <div class="flex-container flex-center flex-column">
      <login-form-button />
      <join-button />
    </div>
    <!-- 회원가입성공 Modal -->
    <modal v-if="showLoginModal" @close="showLoginModal = false">
      <h3 slot="header" class="modal-header--base modal-header--ok">
        축하드립니다! 🎉
      </h3>
      <p slot="body" class="modal-body--base">
        회원님의 회원가입을 진심으로 축하드립니다!<br/>
        로그인 후 이용 가능해요!
      </p>
      <button slot="button" @click="goLogin" class="modal-button--base">
        확인
      </button>
    </modal>
    <!-- 회원가입실패 Modal -->
    <modal v-if="showErrorModal" @close="showErrorModal = false">
      <h3 slot="header" class="modal-header--base modal-header--err">
        양식을 확인해보세요!
      </h3>
      <p slot="body" class="modal-body--base">
        양식이 어딘가 잘못됐어요!<br>
        다시 한 번 확인해주세요 : )
      </p>
      <button slot="button" @click="returnForm" class="modal-button--base">
        돌아가기
      </button>
    </modal>
  </div>
</template>
<script>
import Logo from './../molecules/Logo';
import LoginInput from './../molecules/LoginInput';
import LoginFormButton from './../molecules/LoginFormButton';
import JoinButton from './../molecules/JoinButton';

import Modal from './../molecules/Modal';

import Eventbus from './../../lib/Eventbus';
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'JoinBox',
  components: {
    Logo,
    LoginInput,
    LoginFormButton,
    JoinButton,
    Modal,
  },
  created() {
    Eventbus.$on('join', this.join);
    this.nicknameValid = false;
    this.phoneNumberValid = false;
    console.log('this.nicknameValid: ' + this.nicknameValid);
    console.log('this.phoneNumberValid: ' + this.phoneNumberValid);
  },
  computed: {
    checkPassword() {
      const isPassword = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      if(isPassword.test(this.inputComponents[3].data)) {
        return this.inputComponents[3].data === this.inputComponents[4].data;
      }
    },
    messageColor() {
      return {
        'correct': this.checkPassword,
        'in-correct': !this.checkPassword,
      };
    },
    messageType() {
      if(this.checkPassword) {
        this.userData.password = this.inputComponents[3].data;
        return '비밀번호가 유효합니다!';
      } else {
        delete this.userData.password;
        return '비밀번호는 영문, 숫자를 조합 8~12자 이내로!';
      }
    },
    nicknameArea() {
      return this.inputComponents[1].data;
    },
    phoneNumberArea() {
      return this.inputComponents[2].data;
    }
  },
  watch: {
    nicknameArea: function() {
      this.confirmNickname();
    },
    phoneNumberArea: function() {
      this.confirmPhoneNumber();
    },
  },
  data() {
    return {
      showLoginModal: false,
      showErrorModal: false,
      logoStyle: 'logo--login',
      inputComponents: [
        {
          placeholder: '이름',
          type: 'text',
          data: '',
        },
        {
          placeholder: '닉네임',
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
          placeholder: '패스워드 확인',
          type: 'password',
          data: '',
        },
      ],
      userData: {},
      nicknameValid: false,
      phoneNumberValid: false,
    }
  },
  methods: {
    // 한글이름 2~4글자 확인 후 유효하면 userData.name 등록
    checkName() {
      const isName = /^[가-힣]{2,4}$/;
      const name = this.inputComponents[0].data.replace(/ /gi, '');
      if(isName.test(name)) {
        this.userData.name = name;
        return true;
      } else {
        delete this.userData.name;
        return false;
      }
    },

    // 휴대폰번호가 유효하면 userData.phoneNumber 등록
    // 하이픈(-) 유무는 상관없음
    checkPhoneNumber() {
      const isPhoneNumber = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
      const phoneNumber = this.inputComponents[2].data.replace(/ /gi, '').split('-').join('');
      if(isPhoneNumber.test(phoneNumber)) {
        this.userData.phoneNumber = phoneNumber;
        return true;
      } else {
        delete this.userData.phoneNumber;
        return false;
      }
    },

    checkNickname() {
      const isNickname = /^[\wㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;
      const nickname = this.inputComponents[1].data.replace(/ /gi, '');
      if(isNickname.test(nickname)) {
        this.userData.nickname = nickname;
        return true;
      } else {
        delete this.userData.nickname;
        return false;
      }
    },

    // lodash의 debounce 를 통해 입력된 값을 300ms 마다 db 에서 확인함
    confirmNickname: _.debounce(function() {
      const vm = this;
      vm.inputComponents[1].data = vm.nicknameArea.replace(/ /gi, '');
      const isValid = vm.checkNickname();
      if(isValid && vm.inputComponents[1].data.length !== 0) {
        axios.get('/api/nicknames/' + vm.inputComponents[1].data, {
          params: {
            nickname: vm.inputComponents[1].data,
          },
        })
          .then((result) => {
            if(isValid && result.data.length === 0) {
              this.nicknameValid = true;
              vm.inputComponents[1].placeholder = '사용 가능합니다!';
            } else if(isValid && result.data.length !== 0) {
              this.nicknameValid = false;
              vm.inputComponents[1].placeholder = '이미 있어요!';
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else if(!isValid) {
        this.nicknameValid = false;
        vm.inputComponents[1].placeholder = '제대로 입력해주세요!';
      }
      if(vm.inputComponents[1].data.length === 0) {
        this.nicknameValid = false;
        vm.inputComponents[1].placeholder = '닉네임';
      }
      }, 300),

    confirmPhoneNumber: _.debounce(function() {
      const vm = this;
      vm.inputComponents[2].data = vm.phoneNumberArea.replace(/ /gi, '').split('-').join('');
      const isValid = vm.checkPhoneNumber();
      const phoneNumber = vm.inputComponents[2].data;
      if(isValid && phoneNumber.length !== 0) {
        axios.get('/api/phone-numbers/' + vm.inputComponents[2].data, {
          params: { phoneNumber },
        })
          .then((result) => {
            if(isValid && result.data.length === 0) {
              this.phoneNumberValid = true;
              vm.inputComponents[2].placeholder = '사용 가능합니다!';
            } else if(isValid && result.data.length !== 0) {
              this.phoneNumberValid = false;
              vm.inputComponents[2].placeholder = '이미 있어요!';
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else if(!isValid) {
        this.phoneNumberValid = false;
        vm.inputComponents[2].placeholder = '제대로 입력해주세요!';
      }
      if(phoneNumber.length === 0) {
        this.phoneNumberValid = false;
        vm.inputComponents[2].placeholder = '휴대폰번호';
      }
    }, 300),

    // 회원가입하기
    async join() {
      const isName = this.checkName();
      const isNickname = this.nicknameValid;
      const isPhoneNumber = this.phoneNumberValid;
      console.log(isNickname);
      console.log(isPhoneNumber);
      if(isName && isNickname && isPhoneNumber && this.checkPassword) {
        this.showLoginModal = true;
        try {
          await axios.post('/api/join', {
            phone_number: this.userData.phoneNumber,
            user_password: this.userData.password,
            real_name: this.userData.name,
            nickname: this.userData.nickname,
            /* userData: {
                nickname:
                phoneNumber:
                name:
                password:
             } */
          });
        } catch(err) {
          console.error(err);
        }
      } else {
        this.showErrorModal = true;
      }
    },

    returnForm() {
      this.showErrorModal = false;
    },

    goLogin() {
      this.showLoginModal = false;
      Eventbus.$emit('showLoginForm', this.showLoginForm);
    },
  },
};
</script>
<style scoped>
  .join-body {
    width: 370px;
    height: 650px;
    background-color: #fff;
    border-radius: 10px;
  }
  .join-body__logo {
    width: 100%;
    height: 100px;
    text-align: center;
    padding-top: 30px;
  }
  .password-check-wrap {
    width: 100%;
    text-align: center;
    height: 20px;
    line-height: 20px;
  }
  .password-check {
    font-size: 0.7rem;
    font-weight: normal;
  }
  .correct { color: #1DA1F2; }
  .in-correct { color: #ff2128; }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .modal-header--base {
    padding: 10px 0;
  }

  .modal-header--ok {
    color: #4AB3F4;
    border-bottom: 2px solid #4AB3F4;
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
