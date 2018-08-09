<template>
  <!-- form action 의 주소는 추후 변경,  -->
  <form action="localhost:8080" class="tweet-form" enctype="multipart/form-data">
    <div class="tweet-container">
      <tweet-text-area
        :placeholder="placeholder" />
      <div class="file-box" :class="activeFilebox">
      </div>
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
import AddTweetButton from './../atoms/AddTweetButton';
import Eventbus from '../../lib/Eventbus';


export default {
  name: 'TweetingArea',
  components: {
    TweetTextArea,
    InputMedia,
    TweetButton,
    AddTweetButton,
  },
  created() {
    Eventbus.$on('extendFileBox', this.extendFileBox);
    Eventbus.$on('initFileBox', this.initFileBox);
  },
  computed: {
    activeFilebox() {
      return {
        'file-box--extend': this.hasFile,
        'file-box--reduce': !this.hasFile,
      }
    },
  },
  data() {
    return {
      placeholder: '무슨 일이 일어나고 있나요?',
      editableDivStyle: 'tweet-textarea',
      svgButtonStyle: 'button--media--svg',
      hasFile:  false,
      mediaButtonList: [
        {
          svg: `<svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
	<path fill="none" d="M0,0h24v24H0V0z"/>
		<path fill="currentColor" d="M18,20H4V6h9V4H4C2.9,4,2,4.9,2,6v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-9h-2V20z"/>
		<polygon fill="currentColor" points="10.21,16.83 8.25,14.47 5.5,18 16.5,18 12.96,13.29 		"/>
		<path fill="currentColor" d="M20,4V1h-2v3h-3c0.01,0.01,0,2,0,2h3v2.99c0.01,0.01,2,0,2,0V6h3V4H20z"/>
</svg>`,
          mediaType: 'image',
        },
        {
          svg: `<svg x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
	<path fill="none" d="M0,0h24v24H0V0z"/>
	<path fill="currentColor" d="M15,8v8H5V8H15 M16,6H4C3.45,6,3,6.45,3,7v10c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1v-3.5l4,4v-11l-4,4V7 C17,6.45,16.55,6,16,6L16,6z"/>
</svg>`,
          mediaType: 'video',
        },
      ],
    };
  },
  methods: {
    extendFileBox() {
      this.hasFile = true;
    },
    initFileBox() {
      document.querySelector('.file-box').innerHTML = '';
      this.hasFile = false;
    },
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
  .file-box {
    display: none;
    float: left;
    padding: 8px 16px;
    position: relative;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #ccd6dd;
    width: 100%;
    background-color: #f5f8fa;
  }
  .file-box--extend {
    display: block !important;
    height: 100%;
  }
  .file-box--reduce {
    display: none !important;
    /*height: 100%;*/
  }
</style>
