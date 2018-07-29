<template>
    <a href="#" class="btn">
      <img
        :src="imagePath"
        :class="avatarSize">
    </a>
</template>

<script>
export default {
  name: 'ImageA',
  props: {
    imagePath: {
      type: String,
    },
    avatarSize: {
      type: String,
    }
  },
}
</script>

<style scoped>
  .btn {
    display: inline-block;
    width: auto;
    height: auto;
    border-radius: 50px;
    cursor: pointer;
    transition: 0.1s;
  }
  .btn:hover {
    box-shadow: 0 0 0 2px #FFFFFF, 0 0 1px 4px rgba(29,161,242,0.4);
  }
  img {
    border: 0;
  }
  .avatar--size32{
    width: 32px;
    height: 32px;
    display: block;
    border-radius: 50%;
  }

  .avatar--size48 {
    width: 48px;
    height: 48px;
    display: block;
    border-radius: 50%;
  }

</style>
