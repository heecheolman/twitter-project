<template>
  <div class="main-wrap">
    <main-template
      :user-data="userData" />
  </div>
</template>

<script>
import axios from 'axios';
import store from './../lib/Storage';
import MainTemplate from './../components/templates/MainTemplate';

export default {
  name: 'MainPage',
  components: {
    MainTemplate,
  },
  beforeRouteEnter(to, from, next) {
    axios.get(`/api/phone-numbers/${to.params.phoneNumber}/user-data`, {
      params: {
        phone_number: to.params.phoneNumber,
      },
    })
      .then((user) => {
        store.user = user.data;
        console.log(store.user);
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  },
  created() {
    this.userData = store.user;
  },
  props: {
    phoneNumber: {
      type: String,
    },
  },
  data() {
    return {
      userData: {},
    }
  },
}
</script>

<style scoped>

</style>
