<template>
  <div class="media__container">
    <label for="media-file">
      <svg v-html="svg"></svg>
    </label>
    <input
      type="file"
      id="media-file"
      name="userfile"
      multiple
      @change="inputFileUpdate"/>
  </div>
</template>

<script>
import Eventbus from './../../lib/Eventbus';

export default {
  name: 'InputMedia',
  props: {
    svg: {
      type: String,
    },
    mediaType: {
      type: String,
    },
  },
  created() {

  },
  data() {
    return {
      inputFileList: [],
    };
  },
  methods: {
    handlingFile(file) {
      const fileReader = new FileReader();
      const image = new Image();
      fileReader.addEventListener('load', () => {
        image.height = 100;
        image.title = file.name;
        image.src = fileReader.result;
      }, false);
      fileReader.readAsDataURL(file);
      return image;
    },
    inputFileUpdate() {
      // 파일 업데이트해주는 함수
      const inputDOM = document.querySelector('#media-file');
      const filebox = document.querySelector('.file-box');

      if(inputDOM.files.length !== 0) { // 파일이 하나라도 존재할 시에
        Eventbus.$on('fileBoxOn');
        filebox.style.height = '100%';
        filebox.style.display = 'block';
        for(let i = 0; i < inputDOM.files.length; i++) {
          const file = inputDOM.files[i];
          const imagePreview = this.handlingFile(file);
          filebox.appendChild(imagePreview);
        }
      } else if(inputDOM.files.length === 0) {
        Eventbus.$on('fileBoxOff');
        filebox.style.height = '100%';
        filebox.style.display = 'none';
      }
    },
    getInputFileList() {
      // 파일리스트를 보내는 함수
      // 과연 필요한가?
      // Eventbus 등록
    },
  },
};
</script>

<style scoped>
  .media__container {
    padding: 0;
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    overflow: hidden;
    z-index: 1000;
  }
  .media__container:hover {
    /*border: 1px solid rgba(74, 179, 244, 0.1);*/
    /*box-shadow: inset 0 0 1px rgba(22, 53, 72, 0.1);*/
    box-shadow: inset 0 0 1px #ccd6dd;

    background-color: rgba(74, 179, 244, 0.1);
  }

  label {
    padding: 4px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-radius: 5px;
    color: #4AB3F4;
  }
  svg {
    width: 25px;
    height: 25px;
  }

  input[type=file] {
    position: absolute;
    opacity: 0;
    padding: 0;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  }
</style>




