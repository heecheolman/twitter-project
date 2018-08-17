import axios from 'axios';

// about login
const Auth = {
  login: {
    // hasId 는 id 가 있을 경우
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
  // foologin(id, pw) {
  //     axios.get('/api/phone-numbers/' + id, {
  //       params: { phoneNumber: id, },
  //     })
  //       .then((result) => {
  //         if(this.inputComponents[1].data.length !== 0 && result.data.length !== 0) {
  //           // id 가 일치하는게 db 에 존재한다면  pw 도 체크
  //
  //           return this.passwordCheck();
  //         }
  //       })
  //       // db 의 패스워드와 입력된 패스워드가 같다면 this.isLogin 에 저장
  //       .then((dbPassword) => {
  //         this.isLogin = dbPassword.data[0].user_password === this.inputComponents[1].data;
  //         this.showErrorModal = !this.isLogin;
  //         if(this.isLogin) {
  //           // 로그인 되었을 시 해야할 행동
  //         }
  //       })
  //       .catch(() => {
  //         this.showErrorModal = true;
  //       });
  //   },
  // passwordCheck(id, pw) {
  //   const passwordPromise = axios.get(`/api/password/${id}/${pw}`, {
  //     params: {
  //       phoneNumber: id,
  //       userPassword: pw,
  //     },
  //   });
  //   return passwordPromise;
  // },
};

export default Auth;

