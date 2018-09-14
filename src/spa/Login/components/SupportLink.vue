<template>
  <div class="login-body__support-body flex-container flex-center">
    <span class="text--support">비밀번호를 잊으셨나요?</span>
  </div>
</template>
<script>
export default {
  name: 'SupportLink',
};
</script>
<style scoped>

  .login-body__support-body {
    width: 100%;
    height: 50px;
  }

  .text--support {
    font-size: 0.8rem;
    color: #007aa8;
    text-decoration: underline;
    cursor: pointer;
  }

  .text--support:visited {
    color: #007aa8;
  }
</style>
