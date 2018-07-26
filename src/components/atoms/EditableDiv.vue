<template>
  <div contenteditable="true" class="tweet-textarea is-show-placeholder" placeholder="무슨 일이 일어나고 있나요?" @focus="extendTextArea" @blur="initTextArea">
  </div>
</template>
<script>
export default {
  name: 'EditableDiv',
  methods: {
    // 폼에서 포커싱 빠졌을 시
    initTextArea() {
      const editableDiv = document.querySelector('.tweet-textarea');
      const content = editableDiv.textContent.replace(/(\s*)/g, "");
      const form = document.querySelector('.tweet-form');

      form.style.boxShadow = "none";

      if(content.length === 0) {
        editableDiv.innerHTML = '';
        editableDiv.style.minHeight = "auto";
      } else {
        editableDiv.style.minHeight = "80px";
      }
    },
    // 폼에 포커싱 될 때
    extendTextArea() {
      const editableDiv = document.querySelector('.tweet-textarea');
      const form = document.querySelector('.tweet-form');

      editableDiv.style.minHeight = "80px";
      form.style.boxShadow = "0 0 0 1px #A4D9F9";
    }
  }
};
</script>
<style scoped>
  .tweet-textarea {
    border: 0;
    border-radius: 8px;
    box-shadow: none;
    font-size: 14px;
    padding: 8px;
    outline: none;
    line-height: 20px;
    cursor: text;
    box-sizing: content-box;
  }
  .is-show-placeholder {
    color: #000;
    line-height: 20px;
  }
  .is-show-placeholder:empty:before {
    content: attr(placeholder);
    color: #1DA1F2;
    display: block;
  }

  .is-show-placeholder:empty:focus::before {
    content: attr(placeholder);
    color: #a9a9a9;
  }
</style>
