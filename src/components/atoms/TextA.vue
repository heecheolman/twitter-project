<template>
  <a href="#" :class="aStyle">
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
  .text--id {
    font-weight: bold;
    font-size: 18px;
    color: #14171a;
  }
  .text--id:visited {
    color: #14171a;
  }
  .text--id:hover {
    text-decoration: underline;
  }

  .text--hash {
    font-size: 14px;
    color: #657786;
  }
  .text--hash:visited {
    color: #657786;
  }
  .text--hash:hover {
    text-decoration: underline;
  }

  .text--support {
    font-size: 0.8rem;
    color: #007aa8;
    text-decoration: underline;
  }

  .text--support:visited {
    color: #007aa8;
  }

  a {
    text-decoration: none;
  }
</style>
