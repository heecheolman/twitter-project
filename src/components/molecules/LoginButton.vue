<template>
  <div class="button-wrap flex-container flex-center">
    <button class="button--base button--login" @click="login">
      {{ label }}
    </button>
  </div>
</template>
<script>
import Eventbus from '../../lib/Eventbus';

export default {
  name: 'LoginButton',
  data() {
    return {
      label: '로그인'
    };
  },
  methods: {
    login() {
      Eventbus.$emit('login');
    },
  },
};
</script>
<style scoped>
  .button-wrap {
    width: 100%;
    height: 80px;
  }
  .button--base {
    width: 150px;
    height: 50px;
    outline: none;
    cursor: pointer;
    border: 0;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 400;
    transition: 0.3s;
  }
  .button--login {
    background-color: #00aced;
    color: #ffffff;
  }
  .button--login:hover {
    background-color: #00b9ff;
  }
</style>
