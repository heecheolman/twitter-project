<template>
  <input type="text" :class="fieldStyle" :placeholder="placeholder">
</template>

<script>
export default {
  name: 'InputField',
  props: {
    fieldStyle: {
      type: String,
    },
    placeholder: {
      type: String,
    }
  },
};
</script>

<style scoped>
  .input--search {
    background-color: #f5f8fa;
    border-radius: 21px;
    border: 1px solid #e6ecf0;
    height: 32px;
    width: 100%;
    margin: 0;
    outline: 0;
    padding: 8px 32px 8px 12px;
    transition: .2s ease-in-out;
  }
  .input--search:focus {
    background-color: #fff;
    border: 2px solid #4AB3F4;
  }

</style>
