<template>
  <button class="button--svg">
    <svg :class="svgButtonStyle" v-html="svg"></svg>
  </button>
</template>

<script>
export default {
  name: 'SvgButton',
  props: {
    svgButtonStyle: {
      type: String,
    },
    svg: {
      type: String,
    },
  },
}
</script>

<style scoped>
  .svg--search {
    width: 14px;
    height: 14px;
  }
  .button--svg {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }

</style>
