<template>
  <form action="" class="tweet-form">
    <div class="tweet-container">
      <tweet-text-area
        :placeholder="placeholder" />
    </div>
    <div class="tweet-toolbar-container">
      <div class="tweet-toolbar--left">
        <input-media
          v-for="(button, index) in mediaButtonList"
          :key="index"
          :media-type="button.mediaType"
          :svg="button.svg" />
      </div>
      <div class="tweet-toolbar--right">
        <add-tweet-button />
        <tweet-button />
      </div>
    </div>

  </form>
</template>

<script>
import TweetTextArea from './../atoms/TweetTextArea';
import InputMedia from './../atoms/InputMedia';
import TweetButton from '../atoms/TweetButton';
import AddTweetButton from '../atoms/AddTweetButton';


export default {
  name: 'TweetingArea',
  components: {
    TweetTextArea,
    InputMedia,
    TweetButton,
    AddTweetButton,
  },
  data: function() {
    return {
      placeholder: '무슨 일이 일어나고 있나요?',
      editableDivStyle: 'tweet-textarea',
      svgButtonStyle: 'button--media--svg',
      mediaButtonList: [
        {
          svg: `<svg viewBox="0 0 384 512"><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path></svg>`,
          mediaType: 'image',
        },
        {
          svg: `<svg viewBox="0 0 384 512"><path fill="currentColor" d="M369.941 97.941l-83.882-83.882A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v416c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48V131.882a48 48 0 0 0-14.059-33.941zM332.118 128H256V51.882L332.118 128zM48 464V48h160v104c0 13.255 10.745 24 24 24h104v288H48zm228.687-211.303L224 305.374V268c0-11.046-8.954-20-20-20H100c-11.046 0-20 8.954-20 20v104c0 11.046 8.954 20 20 20h104c11.046 0 20-8.954 20-20v-37.374l52.687 52.674C286.704 397.318 304 390.28 304 375.986V264.011c0-14.311-17.309-21.319-27.313-11.314z"></path></svg>`,
          mediaType: 'video',
        },
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
    /*display: none;*/
    align-items: center;
    margin-top: 10px;
    width: 100%;
    height: 37px;
  }

  .tweet-toolbar--left {
    width: 208px;
    height: 100%;
  }
  .tweet-toolbar--right {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    width: 128px;
    height: 100%;
  }
</style>
