<template>
  <div class="dashboard__profile">
    <div class="dashboard__profile--bg">
    </div>
    <div class="dashboard__profile--content">
      <profile-button
        :imagePath="imagePath"
        :avatarSize="avatarSize" />
      <profile-nickname />
    </div>
  </div>
</template>
<script>
import ProfileButton from './../molecules/ProfileButton';
import ProfileNickname from './../molecules/ProfileNickname';

import ProfileImage from './../../assets/default_profile.png';

export default {
  name: 'DashBoardProfile',
  components: {
    ProfileButton,
    ProfileNickname,
  },
  data: function() {
    return {
      imagePath: ProfileImage,
      avatarSize: 'avatar--size32',
    };
  },
};
</script>
<style scoped>
  .dashboard__profile {
    border: 1px solid #e6ecf0;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
  }
  .dashboard__profile--bg {
    background-size: 100%;
    height: 95px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-position: 0 50%;
    background-color: #1DA1F2 !important;
    width: 100%;
    padding: 0;
  }
  .dashboard__profile--content {
    padding: 15px;
  }
</style>
