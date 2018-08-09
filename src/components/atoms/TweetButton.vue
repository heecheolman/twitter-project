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
  created() {
    Eventbus.$on('addFormImageList', this.addFormImageList);
    Eventbus.$on('removeFormImageList', this.removeFormImageList);
  },
  computed: {
    spinnerSize() {
      return '20px';
    },
  },
  data() {
    return {
      label: '트윗하기',
      loading: false,
      previewList: [],
    };
  },
  methods: {
    addFormImageList(fileId, file) {
      this.previewList.unshift({
        id: fileId,
        file: file,
      });
    },
    removeFormImageList(fileId) {
      for(let it = 0; it < this.previewList.length; it++) {
        if(this.previewList[it].id === fileId) {
          this.previewList.splice(it, 1);
        }
      }
      if(this.previewList.length === 0) {
        Eventbus.$emit('initFileBox');
        Eventbus.$emit('initPreviewList');
      }
    },
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

      if(this.previewList.length !== 0) {
        let formData = new FormData();
        for(let it = 0; it < this.previewList.length; it++) {
          filenameList.push({ filename: this.previewList[it].file.name });
          formData.append(mediaFile.name, this.previewList[it].file);
        }
        try {
          axios.post('/api/upload',
            formData, {
            timeout: 1000,
            });
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
        this.contentsInit();
        this.loadingSpinnerOff();
      }, serverTimeout);
    },

    // 트윗버튼을 누르면 콘텐츠들은 트윗되고 초기화 진행
    // textarea, inputfile 초기화
    contentsInit() {
      this.previewList = [];
      Eventbus.$emit('initTextArea');
      Eventbus.$emit('initFileBox');
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




