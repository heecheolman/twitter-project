<template>
  <div>
    <div class="timeline__tweet-box">
      <profile-button :image-path="imagePath" :avatar-size="avatarSize" :style="{ marginLeft: '10px' }"/>
      <tweeting-area/>
    </div>
  </div>
</template>

<script>
import ProfileButton from './../molecules/ProfileButton';
import ProfileImage from './../../assets/default_profile.png';
import TweetingArea from './../molecules/TweetingArea';

export default {
  name: 'TweetBox',
  components: {

    ProfileButton,
    TweetingArea,
  },
  data: function() {
    return {
      imagePath: ProfileImage,
      avatarSize: 'avatar--size32',
    }
  }
}
</script>

<style scoped>
  .timeline__tweet-box {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e6ecf0;
    background-color: #E8F5FD;
  }
</style>
