<template>
  <div class="main-wrap">
    <header-section />
    <router-view />
  </div>
</template>
<script>
import HeaderSection from './../../shared-components/Header/Header';
import axios from 'axios';

// userData 를 Root 로 하기
import mainUser from '../../vuex/modules/main';
import tweetUser from '../../vuex/modules/tweet';

export default {
  name: 'Main',
  components: {
    HeaderSection,
  },
  beforeRouteEnter(to, from, next) {
    axios.get(`/api/phone-numbers/${to.params.phone}/user-data`, {
      params: {
        phone_number: to.params.phone,
      },
    })
      .then((user) => {
        mainUser.state.user = user.data;
        tweetUser.state.user.id = user.data.id;
        tweetUser.state.user.nickname = user.data.nickname;
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  },

};
</script>
<style scoped>
  .main-wrap {
    width: 100vw;
  }
</style>
