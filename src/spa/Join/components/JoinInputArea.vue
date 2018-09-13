<template>
  <div class="flex-container flex-center flex-column">
    <input-field
      v-for="(field, index) in inputList"
      :key="index"
      :type="field.type"
      :placeholder="field.placeholder"
      :data.sync="field.data"
      :event="field.inputEvent"/>
  </div>
</template>
<script>
import InputField from './../../components/Input/InputField';
export default {
  name: 'InputArea',
  components: {
    InputField,
  },
  data() {
    return {
      inputList: [
        { placeholder: '이름',
          data: '',
          type: 'text',
          inputEvent: (model) => {
            this._data.inputList[0].data = model.target.value;
            this.$store.commit('setName', this._data.inputList[0].data);
        }},
        { placeholder: '닉네임',
          data: '',
          type: 'text',
          inputEvent: (model) => {
            this._data.inputList[1].data = model.target.value;
            this.$store.commit('setNickname', this._data.inputList[1].data);
        }},
        { placeholder: '휴대폰번호',
          data: '',
          type: 'text',
          inputEvent: (model) => {
            this._data.inputList[2].data = model.target.value;
            this.$store.commit('setPhone', this._data.inputList[2].data);
        }},
        { placeholder: '패스워드',
          data: '',
          type: 'password',
          inputEvent: (model) => {
            this._data.inputList[3].data = model.target.value;
            this.$store.commit('setPassword', this._data.inputList[3].data);
        }},
        { placeholder: '패스워드확인',
          data: '',
          type: 'password',
          inputEvent: (model) => {
            this._data.inputList[4].data = model.target.value;
            this.$store.commit('setPasswordCheck', this._data.inputList[4].data);
        }},
      ],
    };
  },
}
</script>
<style scoped>

</style>
