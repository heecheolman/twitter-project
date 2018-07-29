<template>
  <div class="logo-container">
    <h1-tag
      :label="label"
      :class="h1Style" />
  </div>
</template>

<script>
import H1Tag from './../atoms/H1Tag';

export default {
  name: 'Logo',
  components: {
    H1Tag,
  },
  data: function() {
    return {
      label: 'Twitter',
      h1Style: 'logo',
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
