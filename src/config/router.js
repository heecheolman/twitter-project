import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './../spa/Login/Login';
import JoinPage from './../spa/Join/Join';
import MainPage from './../spa/Main/Main';
import Contents from '../spa/Main/components/Contents';

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
      component: MainPage,
      children: [
        {
          name: 'MainPage',
          path: 'contents',
          component: Contents,
        },
        {
          path: 'profile',
          // component: '',
        },
      ],
    },
  ],
});
