<template>
  <li>
    <text-a :label="label" :a-style="aStyle" />
  </li>
</template>
<script>
import TextA from './../atoms/TextA';

export default {
  name: 'MenuTooltip',
  components: {
    TextA,
  },
  props: {
    label: {
      type: String,
    },
    aStyle: {
      type: String,
    },
  },
};
</script>
<style scoped>
  li {
    width: 65px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    float: left;
  }
</style>
