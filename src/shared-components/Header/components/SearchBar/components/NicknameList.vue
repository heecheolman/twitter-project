<template>
  <li class="searched-list-wrap" @click="linkToProfile">
    <div class="searched-list-wrap__nickname-wrap">
      <span class="searched-list-wrap__nickname-wrap__nickname-text">
        {{ nickname }}
      </span>
    </div>
    <div class="searched-list-wrap__follow-button-wrap">
      <button
        :class="disabled"
        class="searched-list-wrap__follow-button-wrap__follow-button"
        @click="follow">팔로우</button>
    </div>
  </li>
</template>
<script>
export default {
  name: 'NicknameList',
  props: {
    id: {
      type: Number,
    },
    nickname: {
      type: String,
    },
    disable: {
      type: Boolean,
    },
  },
  destroyed() {
    this.modelDisable = false;
  },
  created() {
    this.modelDisable = false;
  },
  computed: {
    disabled() {
      return {
        'disabled': this.disable || this.modelDisable,
      };
    }
  },
  data() {
    return {
      modelDisable: false,
    };
  },
  methods: {
    linkToProfile() {

    },
    async follow() {
      if(!this.disable && !this.modelDisable) {
        this.$store.commit('main/setNicknameForFollow', this.nickname);
        await this.$store.dispatch('main/follow');
        this.modelDisable = true;
      }
    }
  },
};
</script>
<style scoped>
  /* Moblie Device */
  @media screen and (max-width: 767px) {
  }

  /* Tablet Device */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
  }

  /* Desktop Device */
  @media screen and (min-width: 1025px) {
  }

  .searched-list-wrap {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #e2e2e2;
    cursor: pointer;
    border-radius: 4px;
  }
  .searched-list-wrap:hover {
    background-color: #E8F5FD;
  }

  .searched-list-wrap__nickname-wrap__nickname-text {
    font-size: 0.8rem;
    color: #14171a;;
    font-weight: 400;
  }

  .list-wrap:hover .searched-list-wrap__nickname-wrap__nickname-text {
    color: #1DA1F2;
    text-decoration: underline;
  }

  .searched-list-wrap__nickname-wrap {
    display: inline-block;
    width: 70%;
    height: 100%;
  }

  .searched-list-wrap__follow-button-wrap {
    display: inline-block;
    width: 50px;
    height: 100%;
  }
  .searched-list-wrap__follow-button-wrap__follow-button {
    outline: none;
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 28px;
    text-align: center;
    line-height: 28px;
    background-color: #1DA1F2;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
  }
  .searched-list-wrap__follow-button-wrap__follow-button:hover {
    background-color: #1577b3;
  }

  .disabled {
    cursor: not-allowed !important;
    background-color: #a9a9a9 !important;
    color: white !important;
  }
</style>
