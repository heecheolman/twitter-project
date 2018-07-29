<template>
  <div>
    <header-section/>
    <!-- ------ Main Content ------ -->
    <div class="content-container wrapper">
      <div class="section">
      </div>
      <div class="timeline-container">
        <tweet-box />
        <ol>
          <timeline-list
            v-for="(content, index) in contentList"
            :key="index"
            :id="content.id"
            :content-text="content.text" />
        </ol>
      </div>
      <div class="section">
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSection from './../organisms/HeaderSection';
import TweetBox from './../organisms/TweetBox';
import TimelineList from '../organisms/TimelineList';
import Eventbus from './../../lib/Eventbus';
import axios from 'axios';

export default {
  name: 'MainTemplate',
  components: {
    HeaderSection,
    TweetBox,
    TimelineList,
  },
  created() {
    this.contentList = [];
    Eventbus.$on('getTimelines', this.getTimelines);
  },
  data: function() {
    return {
      contentList: [],
    };
  },
  methods: {
    getTimelines() {
      axios.get('/api/timelines')
        .then((result) => {
          console.log(result.data);
          this.contentList = result.data;
        });
    },
  }
}
</script>

<style scoped>
  @media screen and (min-width: 1236px) {
    .main-wrap .content-container {
      width: 1190px;
      padding: 56px 20px 15px;
    }

    .main-wrap .content-container .timeline-container {
      margin: 0 10px;
    }
  }

  .content-container {
    position: relative;
    padding: 56px 0 0 15px;
    height: 100%;
    width: 900px;
    margin: 0 auto;
    min-height: 0;
  }

  .section {
    float: left;
    width: 270px;
    height: 900px;
    border: 1px solid #d7d7d7;
  }

  .timeline-container {
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
