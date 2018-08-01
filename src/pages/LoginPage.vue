<template>
  <div class="login-wrap flex-container flex-center">
    <login-template />
  </div>
</template>
<script>
import LoginTemplate from './../components/templates/LoginTemplate';
export default {
  components: {
    LoginTemplate
  },
  name: 'LoginPage',
};
</script>
<style scoped>
  @import './../assets/common.css';
  .login-wrap {
    width: 100vw;
    height: 100vh;
    background-color: #1DA1F2 !important;
  }
</style>
