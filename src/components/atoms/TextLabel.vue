<template>
  <label
    class="label-base"
    :class="option"
    :for="_for">
    {{ placeholder }}
  </label>
</template>

<script>
export default {
  name: 'TextLabel',
  props: {
    _for: {
      type: String,
    },
    option: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
};
</script>

<style scoped>

</style>
