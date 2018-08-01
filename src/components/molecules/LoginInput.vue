<template>
  <div class="input-wrap">
    <label
      class="label--base"
      :class="{ typed: this.value.length !== 0 }">
      {{ component.placeholder }}
    </label>
    <input
      class="input--info"
      :type="component.type"
      v-model="value">
  </div>
</template>

<script>

export default {
  name: 'LoginInput',
  props: {
    component: {
      type: Object,
    },
  },
  data: function() {
    return {
      value: '',
      fieldStyle: 'input--info',
    };
  },
};
</script>
<style scoped>
  .input-wrap {
    width: 250px;
    height: 80px;
    position: relative;
  }
  .label--base {
    color: #999;
    height: 50px;
    line-height: 50px;
    white-space: nowrap;
    font-size:  12px;
    left: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    user-select: none;
    pointer-events: none;
    transition: transform ease-out .1s, -webkit-transform ease-out .1s;
  }
  .input--info {
    box-sizing: border-box;
    outline: none;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    padding-left: 10px;
    width: 250px;
    height: 50px;
    transition: 0.5s;
  }

  .input--info:hover {
    border: 1px solid #00aced;
  }
  .typed {
    transform: scale(.7333) translateX(-6px) translateY(-17px);
  }
</style>
