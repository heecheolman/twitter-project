<template>
  <form action="" class="tweet-form">
    <div class="tweet-container">
      <editable-div :class="editableDivStyle"/>
    </div>
    <div class="tweet-toolbar-container">
      <div class="tweet-toolbar--left">
        <input-media v-for="button in mediaButtonList" :key="index" :label="button.label"/>
      </div>
      <div class="tweet-toolbar--right">

      </div>
    </div>

  </form>
</template>

<script>
import EditableDiv from './../atoms/EditableDiv';
import TweetTextArea from './../atoms/TweetTextArea';
import InputMedia from './../atoms/InputMedia';

export default {
  name: 'TweetingArea',
  components: {
    TweetTextArea,
    EditableDiv,
    InputMedia,
  },
  data: function() {
    return {
      placeholder: '무슨 일이 일어나고 있나요?',
      editableDivStyle: 'tweet-textarea',
      mediaButtonList: [
        { label: 'IMG' },
        { label: 'GIF' },
        { label: 'XXX' },
        { label: 'XXX' },
      ],
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

  .tweet-toolbar-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 37px;
    border: 1px solid #d7d7d7;
  }
  .tweet-toolbar--left {
    width: 208px;
    height: 100%;
    border: 1px solid #d7d7d7;
  }
  .tweet-toolbar--right {
    margin-left: auto;
    width: 128px;
    height: 100%;
    border: 1px solid #d7d7d7;
  }
</style>
