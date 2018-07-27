<template>
  <p class="p--base" :class="pStyle">
    {{ contentText }}
  </p>
</template>
<script>
export default {
  name: 'PText',
  props: {
    pStyle: {
      type: String,
    },
    contentText: {
      type: String,
    },
  },
};
</script>
<style scoped>
  .p--base {
    margin: 0;
    width: 100%;
    word-wrap: break-word;
  }

  .tweet-text {
    color: #14171a;
    font-size: 14px;
    line-height: 20px;
  }
</style>
