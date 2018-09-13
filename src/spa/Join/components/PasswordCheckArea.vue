<template>
  <div class="password-check-wrap">
    <transition name="fade">
        <span
          :class="messageColor"
          class="check-text">{{ message }}</span>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'PasswordCheck',
  computed: {
    message() {
      if(this.$store.state.join.password.length === 0 ) {
        return '';
      } else if(this.$store.getters.getPasswordTest) {
        if(this.$store.getters.getIsPasswordSame) {
          this.$store.commit('setValidPassword', true);
          return '비밀번호가 유효합니다!';
        } else {
          this.$store.commit('setValidPassword', false);
          return '비밀번호가 일치하지 않습니다';
        }
      } else {
        this.$store.commit('setValidPassword', false);
        return '비밀번호는 영문, 숫자를 조합 8자 이상';
      }
    },
    messageColor() {
      return {
        'correct': this.$store.getters.getPasswordTest && this.$store.getters.getIsPasswordSame,
        'in-correct': !this.$store.getters.getPasswordTest || !this.$store.getters.getIsPasswordSame,
      }
    },
  },
};
</script>
<style scoped>
  .password-check-wrap {
    width: 100%;
    text-align: center;
    height: 20px;
    line-height: 20px;
  }
  .check-text {
    font-size: 0.7rem;
    font-weight: normal;
  }

  .correct { color: #1DA1F2; }
  .in-correct { color: #ff2128; }

  /* animation */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
