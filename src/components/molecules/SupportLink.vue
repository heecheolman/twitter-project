<template>
  <div class="support-wrap">
    <text-a
      :class="aStyle"
      :label="label" />
  </div>
</template>
<script>
import TextA from './../atoms/TextA';

export default {
  name: 'SupportLink',
  components: {
    TextA,
  },
  props: {
    label: {
      type: String,
    },
  },
  data: function() {
    return {
      aStyle: 'text--support',
    };
  },
};
</script>
<style scoped>
  .support-wrap {
    text-align: center;
  }
</style>
