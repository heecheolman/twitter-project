<template>
  <div class="tweet-button-container" @click="tweet">
    <button class="button--tweet">
      {{ label }}
    </button>
  </div>
</template>
<script>
import axios from 'axios';
import Eventbus from '../../lib/Eventbus';

export default {
  name: 'TweetButton',
  data: function() {
    return {
      label: '트윗하기',
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
  .button--tweet {
    border: none;
    outline: none;
    background-color: #4AB3F4;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    line-height: 20px;
    padding: 6px 16px;
    border-radius: 100px;
    transition: .1s;
  }

  .button--tweet:focus {
    border-color: #1da1f2;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #71c9f8;
    color: #fff;
  }

  .button--tweet:hover {
    background-color: #1DA1F2;
    border-color: #1DA1F2;
  }
</style>
