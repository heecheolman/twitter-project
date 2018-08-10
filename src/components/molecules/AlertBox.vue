<template>
  <transition name="slide">
    <div class="alert-box" :class="[alertType]">
      <span-text
        :text="alertBox.text"
        :textStyle="alertBox.textStyle" />
    </div>
  </transition>
</template>
<script>
import SpanText from './../atoms/SpanText';
import Eventbus from './../../lib/Eventbus';

export default {
  name: 'AlertBox',
  components: {
    SpanText,
  },
  created() {
    setTimeout(() => {
      this.isAlert = false;
      // animation 이 끝난 뒤에 제거가 되게끔 해야
      Eventbus.$emit('deleteAlert');
    }, 2000);
  },
  props: {
    alertBox: {
      type: Object,
    },
  },
  computed: {
    alertType() {
      return {
        'alert--done': this.isDone,
        'alert--error': !this.isDone,
      }
    },
  },
  data() {
    return {
      isDone: true,
      isAlert: true,
      removeAlertId: null,
    };
  },
};
</script>
<style scoped>
  .alert-box {
    width: 100%;
    height: 50px;
    border-radius: 20px;
    margin-bottom: 15px;
  }
  .alert--done {
    color: #1DA1F2;
    background-color: #fff;
    border: 1px solid #1DA1F2;
  }
  .alert--error {
    border: 1px solid #a9a9a9;
    background-color: #ff5260;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s ease;
  }
  .slide-leave-active {
    transition: all .5s ease-in;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(300px);
  }

</style>
