<template>
  <div class="logo-container">
    <h1-tag
      :label="label"
      :class="logoStyle" />
  </div>
</template>

<script>
import H1Tag from './../atoms/H1Tag';

export default {
  name: 'Logo',
  props: {
    logoStyle: {
      type: String,
    },
  },
  components: {
    H1Tag,
  },
  data() {
    return {
      label: 'Twitter',
    };
  }
}
</script>
<style scoped>
  .logo-container {
    position: relative;
    display: inline-block;
    width: auto;
    height: 100%;
    line-height: 44px;
  }
</style>
