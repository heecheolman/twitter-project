<template>
  <div class="media__container">
    <label for="media-file">
      <svg v-html="svg"></svg>
    </label>
    <input
      type="file"
      id="media-file"
      name="userfile"
      multiple />
  </div>
</template>

<script>
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
    border: 1px solid rgba(74, 179, 244, 0.1);
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




