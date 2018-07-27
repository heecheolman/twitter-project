<template>
  <div class="tweet__area">
    <textarea
      cols="30"
      rows="1"
      :placeholder="placeholder"
      v-model="content"
      @blur="initTextArea"
      @keydown="autoSizing">
      <!-- ** content ** -->

    </textarea>
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
  data: function() {
    return {
      content: '',
    };
  },
  methods: {
    initTextArea() {
      const content = this.content.replace(/(\s*)/g, "");
      const textarea = document.querySelector('textarea');

      if(content.length === 0) {
        this.content = '';
        textarea.style.height = '100%';
      } else {
        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
      }
    },
    autoSizing() {
      const textarea = document.querySelector('textarea');
      setTimeout(() => {
        textarea.style.cssText = 'height: auto; padding: 8px 31px 8px 8px';
        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
      }, 0);
    },
    // 콘텐츠를 가져옴
  },
};

</script>

<style scoped>
  textarea {
    display: block;
    margin: 0;
    padding: 8px 31px 8px 8px;
    width: 100%;
    height: auto;
    resize: none;
    overflow-y: hidden;
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

  textarea:focus::placeholder {
    color: #a9a9a9;
  }
</style>
