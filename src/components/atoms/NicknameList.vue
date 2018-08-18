<template>
  <li class="nickname-wrap" @click="linkToProfile">
    {{ user.nickname }}
  </li>
</template>
<script>
export default {
  name: 'NicknameList',
  props: {
    user: {
      type: Object,
    }
  },
  methods: {
    linkToProfile() {
      // 프로필화면 으로
    },
  },
};
</script>
<style scoped>
  .nickname-wrap {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 0.8rem;
    color: #14171a;;
    font-weight: 400;
    line-height: 40px;
    border-bottom: 1px solid #e2e2e2;
    cursor: pointer;
    border-radius: 4px;
  }
  .nickname-wrap:hover {
    background-color: #E8F5FD;
    color: #1DA1F2;
    text-decoration: underline;
  }
</style>
