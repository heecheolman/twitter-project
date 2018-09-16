<template>
  <div class="header">
    <div class="header__container">
      <div class="header__container__left-tooltip-container">
        <ul>
          <menu-tooltip
          v-for="(tooltip, index) in tooltipList"
          :key="index"
          :label="tooltip.label"
          :click-event="tooltip.clickEvent"/>
        </ul>
      </div>
      <div class="header__container__left-tooltip-container--mobile">
        <!--<hamburger-menu />-->
      </div>
      <!--<logo-->
        <!--:logo-style="logoStyle"/>-->
      <div class="header__container__right-tooltip-container">
        <div class="header__container__right-tooltip-container__search-bar-container">
          <search-bar/>
        </div>
        <!--<div class="right-tooltip-container__right">-->
        <!--<profile-button-->
        <!--:image-path="imagePath"-->
        <!--:avatar-size="avatarSize" />-->
        <!--<tweet-button />-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>
<script>
import MenuTooltip from './components/MenuTooltip';
import SearchBar from './components/SearchBar/SearchBar';

import axios from 'axios';
import vuexUser from '../../vuex/modules/main';

export default {
  name: 'Header',
  components: {
    MenuTooltip,
    SearchBar,
  },
  beforeRouteEnter(to, from, next) {
    axios.get(`/api/phone-numbers/${to.params.phone}/user-data`, {
      params: {
        phone_number: to.params.phone,
      },
    })
      .then((user) => {
        vuexUser.state.user = user.data;
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  },
  data() {
    return {
      tooltipList: [
        {
          label: '홈',
          clickEvent: async () => {
            console.log('home');
          },
        },
        {
          label: '프로필',
          clickEvent: async () => {
            console.log('profile');
          },
        },
        {
          label: '로그아웃',
          clickEvent: async () => {
            console.log('logout');
          },
        }
      ],
    };
  },
};
</script>
<style scoped>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    float: left;
  }
  .header {
    position: fixed;
    z-index: 1000;
    background-color: #ffffff;
    width: 100%;
    height: 45px;
    border-bottom: 1px solid rgba(0,0,0,0.25);
  }
  .header__container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
    height: 100%;
  }
  .header__container__left-tooltip-container {
    float: left;
    display: inline-block;
    width: 200px;
    height: 100%;
  }
  .header__container__right-tooltip-container {
    float: right;
    display: inline-flex;
    align-items: center;
    height: 100%;
  }

  .header__container__right-tooltip-container__search-bar-container {
    display: inline-block;
    height: 100%;
  }
</style>
