import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './../spa/Login/Login';
import JoinPage from './../spa/Join/Join';
import MainPage from './../spa/Main/Main';
import Contents from '../spa/Main/components/Contents';
import Profile from '../spa/Main/components/Profile';
import Other from '../spa/Main/components/OtherProfile';

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
          name: 'ProfilePage',
          path: 'profile/:id',
          component: Profile,
        },
        // {
        //   name: 'OtherProfilePage',
        //   path: '',
        //   component: Other,
        // },
      ],
    },
  ],
});
