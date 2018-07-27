<template>
  <div>
    <text-button
      :label="label"
      :class="buttonStyle"/>
  </div>
</template>
<script>
import TextButton from './../atoms/TextButton';

export default {
  name: 'AddTweetButton',
  components: {
    TextButton,
  },
  data: function() {
    return {
      label: '+',
      buttonStyle: 'button--addtweet',
    };
  },
}

</script>
<style scoped>

</style>
