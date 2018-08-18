<template>
  <div class="main-wrap">
    <main-template
      :user-data="userData" />
  </div>
</template>

<script>
import store from './../lib/Storage';
import MainTemplate from './../components/templates/MainTemplate';
import axios from 'axios';

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
      .then((result) => {
        store.user = result.data[0];
        next();
      })
      .catch((err) => {
        console.error(err);
      })
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
