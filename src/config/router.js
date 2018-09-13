import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './../spa/Login/Login';
import JoinPage from './../spa/Join/Join';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/join',
      name: 'JoinPage',
      component: JoinPage,
    },
  ],
});
