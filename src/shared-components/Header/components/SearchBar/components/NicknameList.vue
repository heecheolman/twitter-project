<template>
  <li class="searched-list-wrap" @click="linkToProfile">
    <div class="searched-list-wrap__nickname-wrap">
      <span class="searched-list-wrap__nickname-wrap__nickname-text">
        {{ user.nickname }}
      </span>
    </div>
    <div class="searched-list-wrap__follow-button-wrap">
      <button
        v-if="!me"
        ref="followButton"
        class="searched-list-wrap__follow-button-wrap__follow-button"
        @click="follow">팔로우</button>
    </div>
  </li>
</template>
<script>
import axios from 'axios';

export default {
  name: 'NicknameList',
  props: {
    user: {
      type: Object,
    }
  },
  computed: {
    disabled() {
      return {
        'disabled': this.isFollow,
      };
    },
  },
  data() {
    return {
      me: false,
      isFollow: false,
      ableClick: true,
      listId: '',
    }
  },
  mounted() {
    const following = this.$store.getters['main/getFollowing'];
    for(let i = 0; i < following.length; i++) {
      if(following[i] === this.user.id) {
        this.$refs.followButton.classList.add('disabled');
        this.ableClick = false;
      }
    }
    // const following = this.$store.getters['main/getFollowing'];
    // following.forEach((id) => {
    //   if(id === this.user.id) {
    //     this.isFollow = true;
    //   }
    // });
  },
  methods: {
    linkToProfile() {
      // 프로필화면 으로
    },
    async follow() {
      if(!this.isFollow) {
        await axios.get(`/api/id/${this.user.nickname}`, {
          params: {
            nickname: this.user.nickname,
          },
        })
          .then((result) => {
            console.log('result.data[0].id is');
            console.log(result.data[0].id);
            this.listId = result.data[0].id;
            return this.addFollow();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    async addFollow() {
      const userId = this.$store.getters['main/getUserId'];
      const followPromise = await axios.put(`/api/follow/${userId}/with/${this.listId}`, {
        params: {
          user_id: userId,
          id: this.listId,
        },
      })
        .then(() => {
          this.isFollow = true;
          this.$store.commit('main/pushFollowingUser', this.listId);
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
