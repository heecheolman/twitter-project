<template>
  <div class="input-wrap">
    <label
      class="label--base"
      :class="isTyped">
      {{ component.placeholder }}
    </label>
    <input
      class="input--info"
      :type="component.type"
      :value="data" @input="$emit('update:data', $event.target.value)">
  </div>
</template>

<script>

export default {
  name: 'LoginInput',
  props: {
    component: {
      type: Object,
    },
    data: {
      type: String,
    },
  },
  computed: {
    isTyped() {
      return {
        'typed': this.data.length !== 0,
      }
    },
  },
  data() {
    return {
      fieldStyle: 'input--info',
      inputComponents: [
        {
          placeholder: '아이디',
          type: 'text',
        },
        {
          placeholder: '패스워드',
          type: 'password',
        },
      ],
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
    box-shadow: 0 2px 4px rgba(0, 172, 237, 0.63), 0 3px 6px rgba(0, 172, 237, 0.08);
  }
  .input--info:focus {
    border: 1px solid #00aced;
    box-shadow: 0 2px 4px rgba(0, 172, 237, 0.35), 0 3px 6px rgba(0, 172, 237, 0.08);

  }
  .typed {
    transform: scale(.7333) translateX(-6px) translateY(-17px);
  }
</style>
