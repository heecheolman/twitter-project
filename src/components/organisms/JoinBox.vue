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
  </div>
</template>
<script>
import Logo from './../molecules/Logo';
import LoginInput from './../molecules/LoginInput';
import LoginFormButton from '../molecules/LoginFormButton';
import JoinButton from '../molecules/JoinButton';

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
  },
  created() {
    Eventbus.$on('join', this.join);
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
          placeholder: '패스워드확인',
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

    confirmNickname: _.debounce(function() {
      const vm = this;
      axios.get('/api/nicknames')
        .then((result) => {
          // result 배열에 { key: value } 존재하는지 여부 return 값이 -1이라면 db에서 존재하지 않으니 유효한 닉네임
          const index = _.findIndex(result.data, { nickname: vm.nicknameArea });
          const isValid = vm.checkNickname();
          if(index === -1 && isValid) {
            this.nicknameValid = true;
            vm.inputComponents[1].placeholder = '사용 가능합니다!';
          } else if(index !== -1 && isValid){
            this.nicknameValid = false;
            vm.inputComponents[1].placeholder = '이미 있어요!';
          } else if(!isValid) {
            this.nicknameValid = false;
            vm.inputComponents[1].placeholder = '제대로 입력해주세요!';
          }

          if(vm.nicknameArea.length === 0) {
            this.nicknameValid = false;
            vm.inputComponents[1].placeholder = '닉네임';
          }
        })
        .catch((err) => {
          console.error(err);
        });
      }, 500),

    confirmPhoneNumber: _.debounce(function() {
      const vm = this;
      axios.get('/api/phone-numbers')
        .then((result) => {
          const index = _.findIndex(result.data, { phone_number: vm.phoneNumberArea });
          const isValid = vm.checkPhoneNumber();

          if(index === -1 && isValid) {
            this.phoneNumberValid = true;
            vm.inputComponents[2].placeholder = '사용 가능합니다!';
          } else if(index !== -1 && isValid) {
            this.phoneNumberValid = false;
            vm.inputComponents[2].placeholder = '이미 있어요!';
          } else if(!isValid){
            this.phoneNumberValid = false;
            vm.inputComponents[2].placeholder = '제대로 입력해주세요!';
          }
          if(vm.phoneNumberArea.length === 0){
            this.phoneNumberValid = false;
            vm.inputComponents[2].placeholder = '휴대폰번호';
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500),

    // 회원가입하기
    async join() {
      const isName = this.checkName();
      const isNickname = this.nicknameValid;
      const isPhoneNumber = this.phoneNumberValid;

      if(isName && isNickname && isPhoneNumber && this.checkPassword) {
        console.log(this.userData);
        try {
          /* userData: {
                nickname:
                phoneNumber:
                name:
                password:
              } */
          await axios.post('/api/join', {
            phone_number: this.userData.phoneNumber,
            user_password: this.userData.password,
            real_name: this.userData.name,
            nickname: this.userData.nickname,
          });
        } catch(err) {
          console.error(err);
        }
      } else {

      }
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
</style>
