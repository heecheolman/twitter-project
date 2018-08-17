// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Auth from './api';

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!Auth.login.isLogin) {
      // 로그인 안되어있다면 로그인페이지로
      next({
        name: 'LoginPage',
      });
    } else {
      // 로그인 되면 next
      next();
    }
  } else {
    // 그외의 다른 페이지는 걍 next
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
