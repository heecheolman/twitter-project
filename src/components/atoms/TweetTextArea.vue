<template>
  <div class="tweet__area">
    <textarea cols="30" rows="1" :placeholder="placeholder"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TweetTextArea',
  props: {
    placeholder: {
      type: String,
    },
  },
};
</script>

<style scoped>
  .tweet__area {
  }
  textarea {
    margin: 0;
    padding: 8px 31px 8px 8px;
    width: 100%;
    height: 100%;
    resize: none;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 14px;
  }
  textarea::placeholder {
    color: #1DA1F2;
    font-weight: 400;
    font-size: 14px;
  }

  textarea:focus {
    height: 80px;
  }
  textarea:focus::placeholder {
    color: #a9a9a9;
  }
</style>
