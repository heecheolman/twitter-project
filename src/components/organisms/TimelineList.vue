<template>
  <li class="timeline-list__list">
    <profile-button
      :image-path="imagePath"
      :avatar-size="avatarSize" />
    <tweet-content
      :id="id"
      :content-serial="contentSerial"
      :content-user-id="contentUserId"
      :content-text="contentText"
      :content-date="stringifyDate"
      :content-filename-list="contentFilenameList" />
  </li>
</template>

<script>
import ProfileButton from './../molecules/ProfileButton';
import ProfileImage from './../../assets/default_profile.png';
import TweetContent from './../molecules/TweetContent';

import DateCalculator from './../../lib/DateCalculator';
import Eventbus from './../../lib/Eventbus';

export default {
  name: 'TimelineList',
  components: {
    ProfileButton,
    TweetContent,
  },
  created() {
    Eventbus.$on('edit', this.edit);
  },
  mounted() {
    this.updateTimelineId = this.updateTimelineDate();
  },
  destroyed() {
    clearInterval(this.updateTimelineId);
  },
  props: {
    id: {
      type: String,
    },
    contentSerial: {
      type: Number,
    },
    contentUserId: {
      type: Number,
    },
    contentText: {
      type: String,
    },
    contentDate: {
      type: String,
    },
    contentFilenameList: {
      type: Array,
    },
  },
  computed: {
    stringifyDate() {
      this.date = '• ' + DateCalculator(this.contentDate);
      return this.date;
    },
  },
  data() {
    return {
      imagePath: ProfileImage,
      avatarSize: 'avatar--size48',
      date: '',
    };
  },
  methods: {
    updateTimelineDate() {
      setInterval(() => {
        this.date = '• ' + DateCalculator(this.contentDate);
      }, 30000);
    },
  }
};

</script>

<style scoped>
  @media screen and (max-width: 425px) {
    .main-wrap .content .content__timeline .timeline-list__list {
      /*width: 320px;*/
      width: 100%;
      height: auto;
    }
    .main-wrap .content .content__timeline .timeline-list__list .profile-button {
      display: none;
      visibility: hidden;
    }
  }
  /* Desktop Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .main-wrap .content .content__timeline .timeline-list__list {
      width: 100%;
      height: auto;
    }
  }


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
