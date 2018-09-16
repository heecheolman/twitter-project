// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './config/router';
import { store } from './vuex/store';

// import Auth from './api/auth';

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if(!Auth.login.isLogin) {
//       // 로그인 안되어있다면 로그인페이지로
//       console.log('no login');
//       next({
//         name: 'LoginPage',
//       });
//     } else {
//       console.log('login');
//       // 로그인 되면 next
//       next();
//     }
//   } else {
//     // 그외의 다른 페이지는 걍 next
//     console.log('another');
//     next();
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
