<template>
  <div class="header">
    <div class="header__container">
      <div class="left-tooltip-container">
        <ul>
          <menu-tooltip
            v-for="(tooltip, index) in tooltipList"
            :key="index"
            :label="tooltip.label"
            :a-style="tooltipStyle" />
        </ul>
      </div>
      <div class="left-tooltip-container--mobile">
        <hamburger-menu />
      </div>
      <logo
        :logo-style="logoStyle"/>
      <div class="right-tooltip-container">
        <div class="search-bar-container">
          <search-bar />
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
import MenuTooltip from './../molecules/MenuTooltip';
import HamburgerMenu from './../molecules/HamburgerMenu';
import Logo from './../molecules/Logo';
import SearchBar from './../molecules/SearchBar';
// import ProfileButton from './../molecules/ProfileButton';
// import TweetButton from '../molecules/TweetButton';

// import ProfileImage from './../../assets/default_profile.png';

export default {
  name: 'HeaderSection',
  components: {
    Logo,
    MenuTooltip,
    SearchBar,
    HamburgerMenu,
    // ProfileButton,
    // TweetButton,
  },
  data() {
    return {
      tooltipList: [
        { label: '홈', },
        { label: '프로필', },
        { label: '로그아웃', }
        ],
      tooltipStyle: 'a--tooltip',
      // avatarSize: 'avatar--size32',
      // imagePath: ProfileImage,
      logoStyle: 'logo',
    };
  },
};
</script>

<style scoped>

  @media screen and (max-width: 425px) {
    .main-wrap .header {
      /*width: 320px;*/
      /*min-width: 320px;*/
      width: 100%;
      min-width: 100%;
    }
    .main-wrap .header .header__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0;
    }
    .main-wrap .header .header__container .left-tooltip-container {
      display: none;
      visibility: hidden;
    }
    .main-wrap .header .header__container .left-tooltip-container--mobile {
      display: flex;
      visibility: visible;
    }
  }

  /* Tablet Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .header .header__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 100%;
      padding: 0;
    }
    .header .header__container .left-tooltip-container {
      display: none;
      visibility: hidden;
    }
    .header .header__container .left-tooltip-container--mobile {
      display: flex;
      visibility: visible;
    }
  }

  /* Desktop Device */
  @media screen and (min-width: 1025px) {
    .header .header__container {
      max-width: 1190px;
    }
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

  .left-tooltip-container {
    float: left;
    display: inline-block;
    width: 200px;
    height: 100%;
  }

  .left-tooltip-container--mobile {
    display: none;
    visibility: hidden;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
  }

  .right-tooltip-container {
    float: right;
    display: inline-flex;
    align-items: center;
    height: 100%;
  }

  .search-bar-container {
    display: inline-block;
    height: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    float: left;
  }

  .right-tooltip-container__right {
    margin: 0;
    padding: 0;
    list-style: none;
    float: right;
    display: inline-flex;
    align-items: center;
    height: 100%;
  }

  .arrow-box {
    /*width: 18px;*/
    /*height: 10px;*/
    /*position: absolute;*/
    /*top: -10px;*/
    /*left: 12px;*/
    width: 18px;
    height: 10px;
    /*float: left;*/
    overflow: hidden;
  }
  .searched-box {
    width: 316px;
    border-radius: 4px;
    background-color: #fff;
    background-clip: padding-box;
    z-index: 999;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  }

  .arrow-box--base {
    position: absolute;
    display: inline-block;
    margin-left: -1px;
  }
  .arrow-box__outer {
    border-bottom: 10px solid #657786;
    border-bottom-color: rgba(0,0,0,0.1);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: auto;
    width: auto;
  }
  .arrow-box__inner {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #fff;
    border-bottom-color: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
