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
          if(result.data.length !== 0) {
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
        .then((dbPassword) => {
          this.isLogin = pw === dbPassword.data[0].user_password;
        })
        .catch(() => {
          this.isLogin = false;
        });
    },
  },
};

export default Auth;

