<template>
  <div class="alert-section">
    <ul>
      <alert-box
        v-for="(alertBox, index) in alertList"
        :key="index"
        :alert-box="alertBox"/>
    </ul>
  </div>
</template>
<script>
/*
* AlertSection
*
* pushAlertList() 를 Eventbus 에 등록 하여 외부 컴포넌트에서 호출 가능
*
* [요구사항]
* 1. push 된 알람은 개발자가 설정한 시간이 지난 뒤에 자동으로 제거 되어야한다.
* 2. animation 은 alert 시 오른쪽에서 왼족으로, 제거 시엔 왼쪽에서 오른쪽으로 사라져야한다.
* */
import AlertBox from './../molecules/AlertBox';
import Eventbus from './../../lib/Eventbus';

export default {
  name: 'AlertSection',
  components: {
    AlertBox,
  },
  created() {
    Eventbus.$on('pushAlert', this.pushAlert);
    Eventbus.$on('deleteAlert', this.deleteAlert);
  },
  data() {
    return {
      alertList: [],
      doneAlert: { text: '트윗완료!', textStyle: '', },
      errorAlert: { text: '트윗실패!', textStyle: '', },
    };
  },
  methods: {
    pushAlert(type) {
      type === 'done' ?
        this.alertList.push(this.doneAlert) :
        this.alertList.push(this.errorAlert);
    },
    deleteAlert() {
      this.alertList.shift();
    },
  },
};
</script>
<style scoped>
  .alert-section {
    width: 200px;
    height: 100vh;
    border: 1px solid #d7d7d7;
    position: absolute;
    right: 10px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
