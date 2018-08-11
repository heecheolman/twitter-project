<template>
  <div class="button-wrap flex-container flex-center">
    <button class="button--base button--join" @click="showJoinForm">
      {{ label }}
    </button>
  </div>
</template>
<script>
import Eventbus from '../../lib/Eventbus';

export default {
  name: 'JoinFormButton',
  data() {
    return {
      label: '가입하기'
    };
  },
  methods: {
    showJoinForm() {
      Eventbus.$emit('showJoinForm');
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
    border: 1px solid #ececec;
    color: #737373;
  }
  .button--join:hover {
    border: 1px solid transparent;
    background-color: #ececec;
  }
</style>
