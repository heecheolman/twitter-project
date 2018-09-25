<template>
  <li class="searched-list-wrap" @click.stop="linkToProfile">
    <div class="searched-list-wrap__nickname-wrap">
      <span class="searched-list-wrap__nickname-wrap__nickname-text">
        {{ nickname }}
      </span>
    </div>
    <div class="searched-list-wrap__follow-button-wrap" v-if="seenButton">
      <button v-if="activeCheck" class="searched-list-wrap__follow-button-wrap__button--base follow-button" @click.stop="follow">팔로우</button>
      <button v-else class="searched-list-wrap__follow-button-wrap__button--base unfollow-button" @click.stop="unfollow">팔로잉</button>
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
    following: {
      type: Array,
    },
    follower: {
      type: Array,
    },
    descript: {
      type: String,
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
    async linkToProfile() {
      // 본인
      if(this.$store.getters['main/getUserId'] === this.id) {
        await this.$store.commit('main/bridgeDataUpdate', {
          id: this.$store.getters['main/getUserId'],
          nickname: this.$store.getters['main/getUserNickname'],
          following: this.$store.getters['main/getUserFollowing'],
          follower: this.$store.getters['main/getUserFollower'],
          descript: this.$store.getters['main/getUserDescript'],
        });
        // 타인
      } else {
        await this.$store.commit('main/bridgeDataUpdate', {
          id: this.id,
          nickname: this.nickname,
          following: this.following,
          follower: this.follower,
          descript: this.descript,
        });
      }
      await this.$store.dispatch('main/filteringFollowingLists');
      await this.$store.dispatch('main/filteringFollowerLists');
      this.$router.replace({
        name: 'ProfilePage',
        params: {
          id: this.$store.getters['main/getBridgeId'],
          nickname: this.$store.getters['main/getBridgeNickname'],
          following: this.$store.getters['main/getBridgeFilteredFollowing'],
          follower: this.$store.getters['main/getBridgeFilteredFollower'],
          descript: this.$store.getters['main/getBridgeDescript'],
        },
      });
    },
    async follow() {
      if(this.ableFollow) {
        this.$store.commit('main/setNicknameData', this.nickname);
        await this.$store.dispatch('main/follow');
        await this.$store.dispatch('tweet/getTimelines');
        this.ableFollow = false;
      }
    },
    async unfollow() {
      if(!this.ableFollow) {
        this.$store.commit('main/setNicknameData', this.nickname);
        await this.$store.dispatch('main/unfollow');
        await this.$store.dispatch('tweet/getTimelines');
        this.ableFollow = true;
      }
    }
  },
};
</script>
<style scoped>
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
</style>
