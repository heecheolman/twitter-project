<template>
  <li class="tweet-container">
    <profile-button
      :image-path="imagePath"
      :avatar-size="avatarSize" />
    <tweet-content
      :id="id"
      :content-text="contentText" />
  </li>
</template>

<script>
import ProfileButton from './../molecules/ProfileButton';
import ProfileImage from './../../assets/default_profile.png';
import TweetContent from './../molecules/TweetContent';

export default {
  name: 'TimelineList',
  components: {
    ProfileButton,
    TweetContent,
  },
  props: {
    id: {
      type: String,
    },
    contentText: {
      type: String,
    },
  },
  data: function() {
    return {
      imagePath: ProfileImage,
      avatarSize: 'avatar--size48',
    };
  },
};

</script>

<style scoped>
  .tweet-container {
    width: 100%;
    position: relative;
    padding: 9px 12px;
    min-height: 51px;
    border-bottom: 1px solid #e6ecf0;
    cursor: pointer;
    background-color: #fff;
  }

  .tweet-container:hover {
    background-color: #f5f8fa;
  }
</style>
