<template>
  <div class="profile-button">
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
  @media screen and (max-width: 425px) {

  }
  .profile-button {
    margin-top: 2px;
    float: left;
  }
</style>
