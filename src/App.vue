<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    background-color: #e6ecf0;
  }
  * {
    box-sizing: border-box;
  }
  #app {
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
</style>
