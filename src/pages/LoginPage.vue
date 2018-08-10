<template>
  <div class="login-wrap flex-container flex-center">
    <transition name="fade" mode="out-in">
      <login-template
        v-if="!isJoinClicked"/>
    <join-template
      v-else/>
    </transition>
  </div>
</template>
<script>
import LoginTemplate from './../components/templates/LoginTemplate';
import JoinTemplate from './../components/templates/JoinTemplate';

import Eventbus from './../lib/Eventbus';

export default {
  components: {
    LoginTemplate,
    JoinTemplate,
  },
  name: 'LoginPage',
  created() {
    Eventbus.$on('clickJoinButton', this.clickJoinButton);
    Eventbus.$on('clickBackButton', this.clickBackButton);
  },
  data() {
    return {
      isJoinClicked: false,
    }
  },
  methods: {
    clickJoinButton() {
      this.isJoinClicked = true;
    },
    clickBackButton() {
      this.isJoinClicked = false;
    },
  }
};
</script>
<style scoped>
  @import './../assets/common.css';
  .login-wrap {
    width: 100vw;
    height: 100vh;
    background-color: #1DA1F2 !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: 0.6s;
  }
  .slide-enter {
    transform: translate(100vw, 0);
  }
  .slide-leave-to {
    transform: translate(-100vw, 0);
  }
</style>
