<template>
  <li class="timeline-list__list">
    <profile-button
      :image-path="imagePath"
      :avatar-size="avatarSize" />
    <tweet-content
      :id="id"
      :content-text="contentText"
      :content-date="contentDate"
      :content-filename="contentFilename" />
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
  updated() {
    console.log('this is updated for TimelineList');
    console.log(`id: ${this.id}`);
    console.log(`content-text: ${this.contentText}`);
    console.log(`content-date: ${this.contentDate}`);
    console.log(`content-filename: ${this.contentFilename}`);
  },
  props: {
    id: {
      type: String,
    },
    contentText: {
      type: String,
    },
    contentDate: {
      type: String,
    },
    contentFilename: {
      type: String,
    },
  },
  data() {
    return {
      imagePath: ProfileImage,
      avatarSize: 'avatar--size48',
    };
  },
};

</script>

<style scoped>
  .timeline-list__list {
    width: 100%;
    position: relative;
    padding: 9px 12px;
    min-height: 51px;
    border-bottom: 1px solid #e6ecf0;
    cursor: pointer;
    background-color: #fff;
  }

  .timeline-list__list:hover {
    background-color: #f5f8fa;
  }
</style>
