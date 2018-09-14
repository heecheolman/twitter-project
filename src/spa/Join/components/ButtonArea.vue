<template>
  <div class="join-body__button-body flex-container flex-center flex-column">
    <join-button />
    <back-button />
  </div>
</template>
<script>
import JoinButton from './Button/JoinButton';
import BackButton from './Button/BackButton';

export default {
  name: 'ButtonArea',
  components: {
    JoinButton,
    BackButton,
  },
};
</script>
<style scoped>

</style>
