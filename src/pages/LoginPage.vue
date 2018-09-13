<template>
  <div class="login-wrap flex-container flex-center">
    <transition name="fade" mode="out-in">
      <login-template
        v-if="showLoginTemplate"/>
      <join-template
        v-else/>
    </transition>
  </div>
</template>
<script>
import LoginTemplate from '../components/templates/LoginTemplate';
import JoinTemplate from './../components/templates/JoinTemplate';

import Eventbus from './../lib/Eventbus';

export default {
  components: {
    LoginTemplate,
    JoinTemplate,
  },
  name: 'LoginPage',
  created() {
    Eventbus.$on('showJoinForm', this.showJoinForm);
    Eventbus.$on('showLoginForm', this.showLoginForm);
  },
  data() {
    return {
      showLoginTemplate: true,
    }
  },
  methods: {
    showJoinForm() {
      this.showLoginTemplate = false;
    },
    showLoginForm() {
      this.showLoginTemplate = true;
    },
  }
};
</script>
<style scoped>
  @import './../assets/common.css';

  /*!* Mobile Device *!*/
  /*@media screen and (max-width: 425px) {*/

  /*}*/

  /*!* Tablet Device *!*/
  /*@media screen and (min-width: 426px) and (max-width: 1024px) {*/

  /*}*/

  /*!* Desktop Device *!*/
  /*@media screen and (min-width: 1025px) {*/

  /*}*/

  .login-wrap {
    width: 100vw;
    height: 100vh;
    background-color: #1DA1F2 !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: 0.5s;
  }
  .slide-enter {
    transform: translate(200%, 0);
  }
  .slide-leave-to {
    opacity: 0;
    transform: translate(200%, 0);
  }
</style>
