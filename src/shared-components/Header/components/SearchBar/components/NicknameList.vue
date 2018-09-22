<template>
  <li class="searched-list-wrap" @click="linkToProfile">
    <div class="searched-list-wrap__nickname-wrap">
      <span class="searched-list-wrap__nickname-wrap__nickname-text">
        {{ nickname }}
      </span>
    </div>
    <div class="searched-list-wrap__follow-button-wrap" v-if="seenButton">
      <button v-if="activeCheck" class="searched-list-wrap__follow-button-wrap__button--base follow-button" @click="follow">
        팔로우
        </button>
      <button v-else class="searched-list-wrap__follow-button-wrap__button--base unfollow-button" @click="unfollow">
        팔로잉
      </button>
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
    active: {
      type: Boolean,
    },
    seenButton: {
      type: Boolean,
    },
  },
  created() {
    this.ableFollow = this.active;
  },
  computed: {
    activeCheck() {
      return this.ableFollow;
    },
  },
  data() {
    return {
      ableFollow: false,
    };
  },
  methods: {
    linkToProfile() {

    },
    async follow() {
      if(this.ableFollow) {
        this.$store.commit('main/setNicknameData', this.nickname);
        await this.$store.dispatch('main/follow');
        this.ableFollow = false;
      }
    },
    async unfollow() {
      if(!this.ableFollow) {
        this.$store.commit('main/setNicknameData', this.nickname);
        await this.$store.dispatch('main/unfollow');
        this.ableFollow = true;
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
  }
  .searched-list-wrap:hover {
    background-color: rgba(101, 119, 134, 0.04);
  }

  .searched-list-wrap__nickname-wrap__nickname-text {
    font-size: 0.8rem;
    color: #657786;
    font-weight: 400;
  }

  .searched-list-wrap:hover .searched-list-wrap__nickname-wrap__nickname-text {
    text-decoration: underline;
  }

  .searched-list-wrap__nickname-wrap {
    display: inline-block;
    width: 50%;
    height: 100%;
  }

  .searched-list-wrap__follow-button-wrap {
    display: inline-block;
    width: 50px;
    height: 100%;
  }
  .searched-list-wrap__follow-button-wrap__button--base {
    outline: none;
    border: none;
    border-radius: 20px;
    width: 100%;
    height: 28px;
    text-align: center;
    line-height: 28px;
    background-color: transparent;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
  }
  .follow-button {
    color: #1DA1F2;
  }
  .follow-button:hover {
    background-color: rgba(29, 161, 242, 0.1);
  }
  .unfollow-button {
    color: #657786;
  }
  .unfollow-button:hover {
    background-color: rgba(101, 119, 134, 0.1);
  }

  /*.abled {*/
    /*color: #1DA1F2;*/
  /*}*/
  /*.disabled {*/
    /*color: #657786;*/
  /*}*/
</style>
