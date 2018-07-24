<template>
  <form action="" class="tweet-form">
    <div class="tweet-container">
      <tweet-text-area :placeholder="placeholder"/>
    </div>
  </form>
</template>

<script>
import TweetTextArea from './../atoms/TweetTextArea';

export default {
  name: 'TweetingArea',
  components: {
    TweetTextArea,
  },
  data: function() {
    return {
      placeholder: '무슨 일이 일어나고 있나요?',
    };
  },
};
</script>

<style scoped>
  .tweet-form {
    margin-left: 56px;
  }

  .tweet-container {
    background: #fff;
    border: 1px solid #C6E7FB;
    border-radius: 8px;
    height: auto;
  }
</style>
