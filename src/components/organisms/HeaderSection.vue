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
      <logo :logo-style="logoStyle"/>
      <div class="right-tooltip-container">
        <div class="search-bar-container">
          <search-bar />
        </div>
        <div class="right-tooltip-container__right">
          <profile-button
            :image-path="imagePath"
            :avatar-size="avatarSize" />
          <tweet-button />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTooltip from './../molecules/MenuTooltip';
import Logo from './../molecules/Logo';
import SearchBar from './../molecules/SearchBar';
import ProfileButton from './../molecules/ProfileButton';
import TweetButton from '../atoms/TweetButton';
import ProfileImage from './../../assets/default_profile.png';

export default {
  name: 'HeaderSection',
  components: {
    Logo,
    MenuTooltip,
    SearchBar,
    ProfileButton,
    TweetButton,
  },
  data: function() {
    return {
      tooltipList: [{ label: '홈' }, { label: '알림' }, { label: '쪽지'}],
      tooltipStyle: 'a--tooltip',
      avatarSize: 'avatar--size32',
      imagePath: ProfileImage,
      logoStyle: 'logo',
    };
  },
};
</script>

<style scoped>
  @media screen and (min-width: 1236px) {
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
    /* PC 로만 일단 */
    min-width: 800px;
  }
  .header__container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    height: 100%;
  }

  .left-tooltip-container {
    float: left;
    display: inline-block;
    width: 200px;
    height: 100%;
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
</style>
