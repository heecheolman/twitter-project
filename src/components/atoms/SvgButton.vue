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
  svg {
    width: inherit;
    height: inherit;
  }
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

  .svg--reply {
    width: 18px;
    height: 18px;
    fill: #657786;
  }
  .svg--reply:hover {
    fill: #1da1fe
  }
</style>




