<template>
    <button :class="buttonStyle">
      {{ this.label }}
    </button>
</template>

<script>
export default {
  name: 'TextButton',
  props: {
    label: {
      type: String,
    },
    buttonStyle: {
      type: String,
    },
  },
}
</script>

<style scoped>
  .button--tweet {
    border: none;
    outline: none;
    background-color: #4AB3F4;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    line-height: 20px;
    padding: 6px 16px;
    border-radius: 100px;
    transition: .1s;
  }

  .button--tweet:focus {
    border-color: #1da1f2;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #71c9f8;
    color: #fff;
  }
</style>
