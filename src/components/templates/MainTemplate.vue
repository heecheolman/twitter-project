<template>
  <div class="main-wrap">
    <header-section/>
    <!-- ------ Main Content ------ -->
    <div class="content">
      <div class="content__section">
        <dash-board-profile
          :nickname="userData.nickname" />
      </div>
      <div class="content__timeline">
        <tweet-box />
        <ol v-show="!loading">
          <timeline-list
            v-for="(content, index) in contentList"
            :key="index"
            :id="content.nickname"
            :content-serial="content.id"
            :content-user-id="content.user_id"
            :content-text="content.contents"
            :content-date="content.created_at"
            :content-filename-list="content.images" />
        </ol>
      </div>
      <div class="content__section">
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSection from './../organisms/HeaderSection';
import TweetBox from './../organisms/TweetBox';
import TimelineList from '../organisms/TimelineList';
import DashBoardProfile from './../organisms/DashBoardProfile';

import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

import Eventbus from './../../lib/Eventbus';
import axios from 'axios';
import store from './../../lib/Storage';

export default {
  name: 'MainTemplate',
  components: {
    HeaderSection,
    TweetBox,
    TimelineList,
    DashBoardProfile,
    ClipLoader,
  },
  props: {
    userData: {
      type: Object,
    },
  },
  created() {
    console.log(store);
    this.contentList = [];
    Eventbus.$on('getTimelines', this.getTimelines);
    this.getTimelines();
  },
  data() {
    return {
      contentList: [],
      loading: false,
    };
  },
  methods: {
    async getTimelines() {
      await axios.get(`/api/timelines/${store.user.id}`, {
        params: {
          user_id: store.user.id,
        },
      })
        .then((result) => {
          this.contentList = result.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  }
}
</script>

<style scoped>
  /* Mobile Device */
  @media screen and (max-width: 425px) {
    .main-wrap .content .content__section,
    .main-wrap .content .content__section .dashboard__profile {
      display: none;
      visibility: hidden;
    }
    .main-wrap .content {
      width: 100%;
      margin: 0;
    }
    .main-wrap .content .content__timeline {
      width: 100%;
      margin-left: 0;
    }
  }

  /* Tablet Device */
  @media screen and (min-width: 426px) and (max-width: 1024px) {
    .main-wrap .content .content__section,
    .main-wrap .content .content__section .dashboard__profile {
      display: none;
      visibility: hidden;
    }
    .main-wrap .content {
      width: 100%;
      margin: 0;
    }
    .main-wrap .content .content__timeline {
      width: 100%;
      margin-left: 0;
    }
  }

  /* Desktop Device */
  @media screen and (min-width: 1025px) {
    .main-wrap .content {
      width: 1190px;
      padding: 56px 20px 15px;
    }

    .main-wrap .content .content__timeline {
      margin: 0 10px;
    }
  }

  .main-wrap {
    width: 100vw;
  }

  .content {
    position: relative;
    /*padding: 56px 0 0 15px;*/
    padding: 50px 0;
    height: 100%;
    width: 900px;
    margin: 0 auto;
    min-height: 0;
  }

  .content__section {
    float: left;
    width: 270px;
    height: 900px;
  }

  .content__timeline {
    float: left;
    margin-left: 25px;
    width: 590px;
    height: 900px;
  }

  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

</style>
