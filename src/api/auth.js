import axios from 'axios';

// about login
const Auth = {
  login: {
    isLogin: false,
    hasId: false,
    async checkId(id) {
      await axios.get(`/api/phone-numbers/${id}`, {
        params: {
          phoneNumber: id,
        },
      })
        .then((result) => {
          if(result.data) {
            this.hasId = true;
          }
        })
        .catch(() => {
          this.hasId = false;
          this.isLogin = false;
        });
    },
    async checkPw(id,pw) {
      await axios.get(`api/password/${id}/${pw}`, {
        params: {
          phoneNumber: id,
          userPassword: pw,
        },
      })
        .then((result) => {
          this.isLogin = result.data;
        })
        .catch(() => {
          this.isLogin = false;
        });
    },
  },
};

export default Auth;

