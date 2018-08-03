<template>
  <div>
    <button class="button--addtweet">
      {{ label }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'AddTweetButton',
  data() {
    return {
      label: '+',
    };
  },
}

</script>
<style scoped>
  .button--addtweet {
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    font-size: 1.4rem;
    border-color: #1DA1F2;
    color: #1DA1F2;
    cursor: pointer;
    text-align: center;
    background-color: #fff;
  }
  .button--addtweet:hover {
    background-color: #E8F5FD;
  }
</style>
