<template>
  <div class="main-wrap">
    <main-template
      :user-data="userData" />
  </div>
</template>

<script>
import MainTemplate from './../components/templates/MainTemplate';
import axios from 'axios';

export default {
  name: 'MainPage',
  components: {
    MainTemplate,
  },
  created() {
    this.userData = {};
    this.fetchData();
    console.log(this.userData);
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
  methods: {
    fetchData() {
      // 유저 데이터를 가져온다.
      axios.get(`/api/phone-numbers/${this.$route.params.phoneNumber}/user-data`, {
        params: {
          phone_number: this.$route.params.phoneNumber,
        },
      })
        .then((result) => {
          console.log(result);
          this.userData = result.data[0];
        })
        .catch((err) => {
          console.error(err);
        })
    },
  }
}
</script>

<style scoped>

</style>
