import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './../pages/MainPage'
import LoginPage from './../pages/LoginPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      meta: {
        requiresAuth: true,
      },
    },


    // 404 not found
    {
      path: '*',
      component: {
        template: `<div class="flex-container flex-center" style="width: 100vw; height: 100vh; font-size: 3rem; font-weight: bold; color: #222222; ">404 not found</div>`,
      },
    }
  ],
});
