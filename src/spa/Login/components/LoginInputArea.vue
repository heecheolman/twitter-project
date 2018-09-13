<template>
  <div class="flex-container flex-center flex-column">
    <input-field
      v-for="(field, index) in inputList"
      :key="index"
      :type="field.type"
      :placeholder="field.placeholder"
      :data.sync="field.data" />
  </div>
</template>
<script>
import InputField from '../../components/Input/InputField';

export default {
  name: 'InputArea',
  components: {
    InputField,
  },
  data() {
    return {
      inputList: [
        { placeholder: '휴대폰번호', data: '', type: 'text' },
        { placeholder: '비밀번호', data: '', type: 'password' },
      ],
    };
  },
}
</script>
<style scoped>

</style>
