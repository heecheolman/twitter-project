<template>
  <div class="logo-container">
    <h1 class="logo-container">Twitter</h1>
  </div>
</template>

<script>
export default {
  name: 'Logo',
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

  h1 {
    user-select: none;
    cursor: default;
    font-size: 1.2rem;
    color: #4AB3F4;
    margin: 0;
    padding: 0;
  }
</style>
