<template>
  <h1 :class="h1Style">
    {{ label }}
  </h1>
</template>
<script>
export default {
  name: 'H1Tag',
  props: {
    label: {
      type: String,
    },
    h1Style: {
      type: String,
    },
  },
};
</script>
<style scoped>
  .logo {
    user-select: none;
    cursor: default;
    font-size: 1.2rem;
    color: #4AB3F4;
    margin: 0;
  }
</style>
