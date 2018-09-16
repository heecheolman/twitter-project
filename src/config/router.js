import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './../spa/Login/Login';
import JoinPage from './../spa/Join/Join';
import Header from './../shared-components/Header/Header';

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
    {
      path: '/main',
      name: 'MainPage',
      component: Header,
      children: [
        {
          path: 'contents',
          // component: '',
        },
        {
          path: 'profile',
          // component: '',
        },
      ],
    },
  ],
});
