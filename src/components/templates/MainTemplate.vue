<template>
  <div>
    <header-section/>
    <!-- ------ Main Content ------ -->
    <div class="content wrapper">
      <div class="content__section">
        <dash-board-profile />
      </div>
      <div class="content__timeline">
        <tweet-box />
        <ol>
          <timeline-list
            v-for="(content, index) in contentList"
            :key="index"
            :id="content.userid"
            :content-text="content.contents"
            :content-date="content.updated_at"
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

import Eventbus from './../../lib/Eventbus';
import axios from 'axios';

export default {
  name: 'MainTemplate',
  components: {
    HeaderSection,
    TweetBox,
    TimelineList,
    DashBoardProfile,
  },
  created() {
    this.contentList = [];
    Eventbus.$on('getTimelines', this.getTimelines);
  },
  data() {
    return {
      contentList: [],
    };
  },
  methods: {
    getTimelines() {
      axios.get('/api/timelines')
        .then((result) => {
          this.contentList = result.data;
          console.log('this is');
          console.log(this.contentList);
        });
    },
  }
}
</script>

<style scoped>
  @media screen and (min-width: 1236px) {
    .main-wrap .content {
      width: 1190px;
      padding: 56px 20px 15px;
    }

    .main-wrap .content .content__timeline {
      margin: 0 10px;
    }
  }

  .content {
    position: relative;
    padding: 56px 0 0 15px;
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
