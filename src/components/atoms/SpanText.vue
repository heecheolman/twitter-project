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
  .text--nickname {
    font-weight: bold;
    font-size: 14px;
    color: #14171a;
  }
  .text--date {
    font-size: 14px;
    color: #657786;
  }
  .text--edit {
    font-size: 12px;
    font-weight: normal;
    color: #657786;
    float: right;
  }
  .text--edit:hover {
    text-decoration: underline;
  }
</style>
