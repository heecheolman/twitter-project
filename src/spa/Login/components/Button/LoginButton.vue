<template>
  <div class="button-wrap flex-container flex-center">
    <button class="button--base button--login" @click="login">
      로그인
    </button>
  </div>
</template>
<script>

export default {
  name: 'LoginButton',
  methods: {
    login() {

    }
  }
}
</script>
<style scoped>
  .button-wrap {
    width: 100%;
    height: 70px;
  }
  .button--base {
    width: 150px;
    height: 40px;
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
