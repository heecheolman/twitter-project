<template>
  <div class="tweet-button-container">
    <text-button :label="label" :class="buttonStyle"/>
  </div>
</template>
<script>
import TextButton from './../atoms/TextButton';

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
};
</script>
<style scoped>
  .tweet-button-container {
    margin-left: 16px;
    float: left;
  }
</style>
