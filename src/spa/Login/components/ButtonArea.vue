<template>
  <div class="login-body__button-body flex-container flex-center flex-column">
    <login-button />
    <join-form-button />
  </div>
</template>
<script>
import LoginButton from './Button/LoginButton';
import JoinFormButton from './Button/JoinFormButton';

export default {
  name: 'ButtonArea',
  components: {
    LoginButton,
    JoinFormButton,
  }
};
</script>
<style scoped>
  .login-body__button-body {
    width: 100%;
    height: 200px;
  }
</style>
