<template>
  <span :class="textStyle">
    {{ text }}
  </span>
</template>

<script>
export default  {
  name: 'SpanText',
  props: {
    textStyle: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style scoped>
  .text--id {
    font-weight: bold;
    font-size: 14px;
    color: #14171a;
  }
</style>
