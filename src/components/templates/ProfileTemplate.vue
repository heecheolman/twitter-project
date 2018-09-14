<template>
  <div class="main-wrap">
    <header-section/>
  </div>
</template>
<script>
import HeaderSection from './../organisms/HeaderSection';

export default {
  name: 'ProfileTemplate',
  components: {
    HeaderSection,
  }
};
</script>
<style scoped>
  .main-wrap {
    width: 100vw;
  }
</style>
