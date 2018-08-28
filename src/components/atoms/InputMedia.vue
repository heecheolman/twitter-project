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
      @change="inputFileUpdate" />
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
  },
  created() {
    this.fileIdCounter = 0;
  },
  data() {
    return {
      fileIdCounter: 0,
    };
  },
  methods: {
    createImage(file) {
      const fileReader = new FileReader();
      const image = new Image();
      fileReader.addEventListener('load', () => {
        image.title = file.name;
        image.style.width = 'auto';
        image.style.height = 'auto';
        image.style.overflow = 'hidden';
        image.style.cursor = 'pointer';
        image.src = fileReader.result;
      }, false);
      fileReader.readAsDataURL(file);
      return image;
    },
    createXButton(fileId) {
      const xButton = document.createElement('div');
      xButton.style.width = '20px';
      xButton.style.height = '20px';
      xButton.style.borderRadius = '50%';
      xButton.style.backgroundColor = 'black';
      xButton.style.color = 'white';
      xButton.style.fontSize = '14px';
      xButton.style.lineHeight = '16px';
      xButton.style.textAlign = 'center';
      xButton.style.fontWeight = 'lighter';
      xButton.style.position = 'absolute';
      xButton.style.marginLeft = '80px';
      xButton.style.marginTop = '5px';
      xButton.style.cursor = 'pointer';
      xButton.fileId = fileId;
      xButton.userSelect = 'none';
      const x = document.createTextNode('x');
      xButton.appendChild(x);
      xButton.addEventListener('click', () => {
        const frame = xButton.parentElement;
        Eventbus.$emit('removeFormImageList', xButton.fileId);
        frame.remove();
      });
      return xButton;
    },
    createImageWrap() {
      const div = document.createElement('div');
      div.style.width = '113px';
      div.style.height = '113px';
      div.style.display = 'inline-block';
      div.style.overflow = 'hidden';
      div.style.borderRadius = '5px';
      div.style.border = '1px solid #d7d7d7';
      div.style.marginRight = '5px';
      return div;
    },
    inputFileUpdate() {
      const inputDOM = document.querySelector('#media-file');
      const filebox = document.querySelector('.file-box');
      // 파일이 하나라도 존재할 시에
      if(inputDOM.files.length !== 0) {
        Eventbus.$emit('extendFileBox');
        for(let i = inputDOM.files.length - 1; i > -1; i--) {
          this.fileIdCounter++;
          const file = inputDOM.files[i];
          const fileId = this.fileIdCounter;
          const imagePreview = this.createImage(file);
          const imageWrap = this.createImageWrap();
          const xButton = this.createXButton(fileId);
          Eventbus.$emit('addFormImageList', fileId, file);
          imageWrap.appendChild(xButton);
          imageWrap.appendChild(imagePreview);
          filebox.appendChild(imageWrap);
        }
        // 파일이 존재하지만 취소를 눌렀을 시
      } else if(this.fileIdCounter === 0) {
        Eventbus.$emit('initFileBox');
      }
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

  .fadeOut {
    animation: fadeOut 0.2s both;
  }


  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
