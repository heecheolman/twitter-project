<template>
  <a href="" :class="aStyle">
    {{ label }}
  </a>
</template>

<script>
export default {
  name: 'TextA',
  props: {
    label: {
      type: String,
    },
    aStyle: {
      type: String,
    }
  },
}
</script>

<style scoped>
  .a--tooltip {
    font-size: 13px;
    font-weight: bold;
    display: block;
    color: #4AB3F4;
    transition: .1s ease-in-out;
  }
  .a--tooltip:hover {
    border-bottom: 2px solid #4AB3F4;
  }
  .a--tooltip:visited {
    color: #4AB3F4;
  }
  a {
    text-decoration: none;
  }
</style>
