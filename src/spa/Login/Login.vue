<template>
  <div class="wrap--common flex-container flex-center">
    <transition name="fade">
      <div class="login-body">
        <logo-area />
        <input-area />
        <support-link />
        <button-area />
      </div>
    </transition>
    <alert-modal v-if="isError" @close="closeModal">
      <h3 slot="header" class="modal-header--base modal-header--err">
        로그인 실패!
      </h3>
      <p slot="body" class="modal-body--base">
        입력한 정보를 다시 확인해주세요 : )
      </p>
      <button slot="button" @click="closeModal" class="modal-button--base">
        확인
      </button>
    </alert-modal>
  </div>
</template>
<script>
import LogoArea from '../components/LogoArea';
import InputArea from './components/LoginInputArea';
import SupportLink from './components/SupportLink';
import ButtonArea from './components/ButtonArea';
import AlertModal from './../components/AlertModal';

export default {
  name: 'Login',
  components: {
    LogoArea,
    InputArea,
    SupportLink,
    ButtonArea,
    AlertModal,
  },
  destroyed() {
    this.$store.commit('login/clearUserData');
  },
  computed: {
    isError() {
      return this.$store.getters['login/getErrorModal'];
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('login/closeModal');
    }
  },
};
</script>
<style scoped>
  .login-body {
    width: 370px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
  }
  /* animation */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
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
