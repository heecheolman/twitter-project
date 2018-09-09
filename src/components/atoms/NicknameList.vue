<template>
  <li class="list-wrap" @click="linkToProfile">
    <div class="nickname-wrap">
      <span class="nickname-text">{{ user.nickname }}</span>
    </div>
    <div class="follow-button-wrap">
      <button
        v-if="!me"
        class="follow-button"
        @click="follow"
        ref="followButton"
        >팔로우</button>
    </div>
  </li>
</template>
<script>
import axios from 'axios';
import store from './../../lib/Storage';

export default {
  name: 'NicknameList',
  props: {
    user: {
      type: Object,
    }
  },
  data() {
    return {
      me: false,
      ableClick: true,
      listId: '',
    }
  },
  mounted() {
    if(store.user.following !== null) {
      for(let i = 0; i < store.user.following.length; i++) {
        if(store.user.following[i] === this.user.id) {
          this.$refs.followButton.classList.add('disabled');
          this.ableClick = false;
        }
      }
    } else {
      store.user.following = [];
    }

  },
  methods: {
    linkToProfile() {
      // 프로필화면 으로
    },
    async follow() {
      if(this.ableClick) {
        await axios.get(`/api/id/${this.user.nickname}`, {
          params: {
            nickname: this.user.nickname,
          },
        })
          .then((result) => {
            this.listId = result.data[0].id;
            return this.addFollow();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    async addFollow() {
      const followPromise = await axios.put(`/api/follow/${store.user.id}/with/${this.listId}`, {
        params: {
          user_id: store.user.id,
          id: this.listId,
        },
      })
        .then(() => {
          this.ableClick = false;
          this.$refs.followButton.classList.add('disabled');
          store.user.following.push(this.listId);
        })
        .catch((err) => {
          console.error(err);
        });
      return followPromise;
    },
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

  .list-wrap {
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
  .list-wrap:hover {
    background-color: #E8F5FD;
  }

  .nickname-text {
    font-size: 0.8rem;
    color: #14171a;;
    font-weight: 400;
  }

  .list-wrap:hover .nickname-text {
    color: #1DA1F2;
    text-decoration: underline;
  }

  .nickname-wrap {
    display: inline-block;
    width: 70%;
    height: 100%;
  }

  .follow-button-wrap {
    display: inline-block;
    width: 50px;
    height: 100%;
  }
  .follow-button {
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
  .follow-button:hover {
    background-color: #1577b3;
  }

  .disabled {
    cursor: not-allowed !important;
    background-color: #a9a9a9 !important;
    color: white !important;
  }
</style>
