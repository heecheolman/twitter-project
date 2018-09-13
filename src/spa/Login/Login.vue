<template>
  <div class="wrap--common flex-container flex-center">
    <div class="login-body">
      <logo-area />
      <input-area />
      <support-link />
      <button-area />
    </div>
  </div>
</template>
<script>
import LogoArea from '../components/LogoArea';
import InputArea from './components/LoginInputArea';
import SupportLink from './components/SupportLink';
import ButtonArea from './components/ButtonArea';
// import AlertModal from './../components/AlertModal';

export default {
  name: 'Login',
  components: {
    LogoArea,
    InputArea,
    SupportLink,
    ButtonArea,
    // AlertModal,
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

</style>
