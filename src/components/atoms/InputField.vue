<template>
  <input
    :type="type"
    :class="fieldStyle"
    :placeholder="placeholder"
    @input="searching"
    v-model="inputValue">
</template>

<script>
import Eventbus from './../../lib/Eventbus';
import axios from 'axios';
import store from './../../lib/Storage';
import _ from 'lodash';

export default {
  name: 'InputField',
  props: {
    type: {
      type: String,
    },
    fieldStyle: {
      type: String,
    },
    placeholder: {
      type: String,
    }
  },
  watch: {
    inputValue: function() {
      this.searchUserData();
    }
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    searching() {
      if(this.inputValue.length !== 0) {
        Eventbus.$emit('toggleOn');
      } else {
        Eventbus.$emit('toggleOff');
      }
    },
    searchUserData: _.debounce(function() {
      if(this.inputValue.length !== 0) {
        axios.get(`/api/${store.user.id}/nickname-list/${this.inputValue}`, {
          params: {
            id: store.user.id,
            input: this.inputValue,
          },
        })
          .then((result) => {
            Eventbus.$emit('updateNicknameList', result.data);
          })
          .catch((err) => {
            console.error(err);
          })
      }
    }, 500),
  }
};
</script>

<style scoped>
  .input--search {
    background-color: #f5f8fa;
    border-radius: 21px;
    border: 1px solid #e6ecf0;
    height: 32px;
    width: 100%;
    margin: 0;
    outline: 0;
    padding: 8px 32px 8px 12px;
    transition: .2s ease-in-out;
  }
  .input--search:focus {
    background-color: #fff;
    border: 2px solid #4AB3F4;
  }
  /**/
</style>
