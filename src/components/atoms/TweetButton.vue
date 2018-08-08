<template>
  <div class="tweet-button-container">
    <clip-loader :loading="loading" :size="spinnerSize"/>
    <button class="button--tweet" v-show="!loading" @click="tweet">
      {{ label }}
    </button>
  </div>
</template>
<script>
import axios from 'axios';
import Eventbus from '../../lib/Eventbus';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'


export default {
  name: 'TweetButton',
  components: {
    ClipLoader,
  },
  data() {
    return {
      label: '트윗하기',
      loading: false,
    };
  },
  computed: {
    spinnerSize() {
      return '20px';
    },
  },
  methods: {
    loadingSpinnerOn() {
      this.loading = true;
    },
    loadingSpinnerOff() {
      this.loading = false;
    },
    async tweet() {
      this.loadingSpinnerOn();
      const serverTimeout = 500;
      const mediaFile = document.querySelector('#media-file');
      const content = document.querySelector('textarea').value;
      let filenameList = [];

      // upload file 이 1개라도 존재한다면 다음 구문 실행
      if(mediaFile.files.length !== 0) {
        let formData = new FormData();
        for(let i = 0; i < mediaFile.files.length; i++) {
          const file = mediaFile.files[i];
          filenameList.push({ filename: file.name });
          formData.append(mediaFile.name, file);
        }
        try {
          axios.post('/api/upload', formData, { timeout: 1000, });
        } catch (err) {
          console.error(err);
        }
      }

      setTimeout(async () => {
        try {
          await axios.post('/api/tweet', {
            id: '김희철',
            text: content,
            filenameList: filenameList,
          }, {
            timeout: serverTimeout,
          });
        } catch (err) {
          console.error(err);
        }
        Eventbus.$emit('getTimelines');
        this.contentInit();
        this.loadingSpinnerOff();
      }, serverTimeout);
    },

    // tweetBtn 을 누른 후 콘텐츠 초기화
    contentInit() {
      const textarea = document.querySelector('textarea');
      document.querySelector('#media-file').value = '';
      textarea.value = '';
      textarea.style.height = 'auto';
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




