<template>
  <div class="button-wrap flex-container flex-center">
    <button class="button--base button--join" @click="join">
      {{ label }}
    </button>
  </div>
</template>
<script>
import Eventbus from './../../lib/Eventbus';

export default {
  name: 'JoinButton',
  data() {
    return {
      label: '회원가입'
    };
  },
  methods: {
    join() {
      console.log('emit join');
      Eventbus.$emit('join');
    },
  },
};
</script>
<style scoped>
  .button-wrap {
    width: 100%;
    height: 70px;
  }
  .button--base {
    width: 150px;
    height: 40px;
    outline: none;
    cursor: pointer;
    border: 0;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 400;
    transition: 0.3s;
  }
  .button--join {
    background-color: #00aced;
    color: #ffffff;
  }
  .button--join:hover {
    background-color: #00b9ff;
  }
</style>
