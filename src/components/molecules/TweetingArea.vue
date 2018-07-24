<template>
  <form action="" class="tweet-form">
    <div class="tweet-container">
      <editable-div :class="editableDivStyle"/>
    </div>
  </form>
</template>

<script>
import EditableDiv from './../atoms/EditableDiv';
import TweetTextArea from './../atoms/TweetTextArea';

export default {
  name: 'TweetingArea',
  components: {
    TweetTextArea,
    EditableDiv,
  },
  data: function() {
    return {
      placeholder: '무슨 일이 일어나고 있나요?',
      editableDivStyle: 'tweet-textarea',
    };
  },
};
</script>

<style scoped>
  .tweet-form {
    margin-left: 56px;
    border-radius: 8px;
  }
  form:focus {
    box-shadow: 0 0 0 1px #A4D9F9;
  }

  .tweet-container {
    overflow-y: auto;
    position: relative;
    background: #fff;
    border: 1px solid #C6E7FB;
    border-radius: 8px;
    height: 100%;
  }
</style>
