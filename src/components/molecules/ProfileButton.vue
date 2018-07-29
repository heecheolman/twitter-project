<template>
  <div class="profile-button-container">
    <image-a
      :image-path="imagePath"
      :avatar-size="avatarSize" />
  </div>
</template>
<script>
import ImageA from './../atoms/ImageA';

export default {
  name: 'ProfileButton',
  components: {
    ImageA,
  },
  props: {
    imagePath: {
      type: String,
    },
    avatarSize: {
      type: String,
    }
  },
};
</script>
<style scoped>
  .profile-button-container {
    margin-top: 2px;
    float: left;
  }
</style>
