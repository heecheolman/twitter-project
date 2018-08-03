<template>
  <div class="profile__nickname">
    <text-a
      :label="id"
      :a-style="idStyle" />
    <text-a
      :label="hash"
      :a-style="hashStyle" />
  </div>
</template>
<script>
import TextA from './../atoms/TextA';

export default {
  name: 'ProfileNickname',
  components: {
    TextA,
  },
  data() {
    return {
      id: '김희철',
      idStyle: 'text--id',
      hash: '@fMUmSjMbVbjhqBO',
      hashStyle: 'text--hash',
    };
  },
}
</script>
<style scoped>
  .profile__nickname {
    margin-left: 45px;
    width: 185px;
    height: 44px;
  }
</style>
