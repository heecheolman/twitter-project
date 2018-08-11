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
          v-if="this.inputComponents[2].data.length !== 0"
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
    passwordCheck() {
      const isPassword = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      if(isPassword.test(this.inputComponents[3].data) &&
         isPassword.test(this.inputComponents[4].data)) {
        return this.passwordSame;
      }
    },
    messageColor() {
      return {
        'correct': this.passwordCheck,
        'in-correct': !this.passwordCheck,
      };
    },
    messageType() {
      if(this.passwordCheck) {
        return '비밀번호가 유효합니다!';
      } else {
        return '비밀번호는 영문, 숫자를 조합 8~12자 이내로!';
      }
    },
    passwordSame() {
      return this.inputComponents[3].data === this.inputComponents[4].data
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
      passwordMessage: '',
      isPasswordSame: this.passwordSame,
    }
  },
  methods: {
    // 입력 폼 유효성 검사
    formCheck() {
      const isName = /^[가-힣]{2,4}$/;
      const isPhoneNumber = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
      const isNickname = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;

      let isValid = false;
      const name        = this.inputComponents[0].data.replace(/ /gi, '');
      const nickname    = this.inputComponents[1].data.replace(/ /gi, '');
      const phoneNumber = this.inputComponents[2].data.replace(/ /gi, '').split('-').join('');

      // 닉네임 체크

      if(isName.test(name) &&  isPhoneNumber.test(phoneNumber) && isNickname.test(nickname) && this.passwordCheck) {
        isValid = true;
      }

      return isValid;
    },
    // 회원가입하기
    async join() {
      // if(this.formCheck()) {
        // 폼 체크가 되었다면 db 로 넘겨줘야한다.
        // 닉네임과 휴대폰번호 중복 체크도 해야한다.
      // console.log('1');
        try {
          await axios.post('/api/join', {
            phone_number: '01099754457',
            user_password: 'gmlcjf12',
            real_name: '김희철',
            nickname: 'heecheolman',
          });
          // console.log('2');
        } catch(err) {
          console.error(err);
        }
      // console.log('3');
      // }
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
