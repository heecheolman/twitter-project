<template>
  <span class="button-container">
    <div>
      <button>
        {{ label }}
      </button>
    </div>
  </span>
</template>

<script>
export default {
  name: 'InputMedia',
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style scoped>
  .button-container {
    display: inline-block;
    position: relative;
  }
  button {
    width: 35px;
    height: 35px;
    background-color: transparent;
    border: 0;
    outline: none;
    color: #1DA1F2;
    cursor: pointer;
    border-radius: 50%;
  }
  button:hover {
    background-color: rgba(190, 190, 190, 0.1);
  }

</style>



