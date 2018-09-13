<template>
  <div class="wrap--common flex-container flex-center">
    <div class="join-body">
      <logo-area />
      <input-area/>
      <password-check-area />
      <button-area />
    </div>
  </div>
</template>
<script>
import LogoArea from './../components/LogoArea';
import InputArea from './components/JoinInputArea';
import PasswordCheckArea from './components/PasswordCheckArea';
import ButtonArea from './components/ButtonArea';

export default {
  name: 'Join',
  components: {
    LogoArea,
    InputArea,
    PasswordCheckArea,
    ButtonArea,
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

</style>
