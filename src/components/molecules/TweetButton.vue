<template>
  <div class="tweet-button-container" @click="tweet">
    <text-button :label="label" :class="buttonStyle"/>
  </div>
</template>
<script>
import TextButton from './../atoms/TextButton';
import axios from 'axios';
import Eventbus from './../../lib/Eventbus';

export default {
  name: 'TweetButton',
  components: {
    TextButton,
  },
  data: function() {
    return {
      label: '트윗하기',
      buttonStyle: 'button--tweet',
    };
  },
  methods: {
    tweet() {
      const content = document.querySelector('textarea').value;
      axios.post('/api/tweet', {
        id: '김희철',
        text: content,
      }).then(Eventbus.$emit('getTimelines'));
    },
  }
};
</script>
<style scoped>
  .tweet-button-container {
    margin-left: 16px;
    float: left;
  }
</style>
