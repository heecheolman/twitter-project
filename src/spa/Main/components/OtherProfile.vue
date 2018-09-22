<template>
  <div class="profile-wrap">
    <div class="profile-wrap__top-section">
      <!--프로필 카드-->
      <div class="profile-wrap__top-section__profile-card">
        <div class="profile-wrap__top-section__profile-card--top">
          <div class="profile-wrap__top-section__profile-card--top__header">
            <span class="profile-wrap__top-section__profile-card--top__header--nickname">
              other
            </span>
          </div>
          <div class="profile-wrap__top-section__profile-card--top__contents">
            <p class="profile-wrap__top-section__profile-card--top__contents--desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
          </div>
        </div>
        <div class="profile-wrap__top-section__profile-card--bottom">
          <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap">
            <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap__header">Following</div>
            <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap__list">
              <ul>
                <nickname-list
                  v-for="(user, index) in getFollowingNicknameList"
                  :key="index"
                  :nickname="user.nickname"
                  :id="user.id"
                  :active="user.active"
                  :seen-button="true"/>
              </ul>
            </div>
          </div>
          <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap">
            <div class="profile-wrap__top-section__profile-card--bottom__follow-wrap__header">Follower</div>
            <ul>
              <nickname-list
                v-for="(user, index) in getFollowerNicknameList"
                :key="index"
                :nickname="user.nickname"
                :id="user.id"
                :active="user.active"
                :seen-button="false"/>
            </ul>
          </div>
        </div>
      </div>
      <!--타임라인들-->
    </div>
  </div>
</template>
<script>
  import ProfileImg from './../../../assets/img/default_profile.png';
  import NicknameList from './../../../shared-components/Header/components/SearchBar/components/NicknameList';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Profile',
    components: {
      NicknameList,
    },
    destroyed() {
      this.$store.commit('main/clearList');
    },
    async created() {
      console.log('created');
      await this.$store.dispatch('main/fetchFollowingNicknameList');
      await this.$store.dispatch('main/fetchFollowerNicknameList');
    },
    computed: {
      ...mapGetters({
        getFollowingNicknameList: 'main/getFollowingNicknameList',
        getFollowerNicknameList: 'main/getFollowerNicknameList',
      }),
    },
    data() {
      return {
        imgPath: ProfileImg,
      }
    }
  };
</script>
<style scoped>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .profile-wrap {
    position: relative;
    padding: 50px 0;
    height: 100%;
    width: 900px;
    margin: 0 auto;
    min-height: 0;
  }
  .profile-wrap__top-section {
    box-sizing: border-box;
    margin: 0 auto;
    width: 400px;
    height: 100%;
    border: 1px solid #d7d7d7;
  }
  .profile-wrap__top-section__profile-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    background: #fff;
  }

  .profile-wrap__top-section__profile-card--top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 200px;
  }
  .profile-wrap__top-section__profile-card--bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    width: 400px;
    height: 200px;
  }
  .profile-wrap__top-section__profile-card--top__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
  }
  .profile-wrap__top-section__profile-card--top__header--nickname {
    font-size: 18px;
    font-weight: bold;
    color: #657786;
  }
  .profile-wrap__top-section__profile-card--top__contents {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
  }
  .profile-wrap__top-section__profile-card--top__contents--desc {
    margin: 0;
    line-height: 150%;
    text-align: justify;
    color: #657786;
    font-size: 14px;
  }
  .profile-wrap__top-section__profile-card--bottom__follow-wrap {
    width: 150px;
    height: 200px;
  }
  .profile-wrap__top-section__profile-card--bottom__follow-wrap__header {
    color: #657786;
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid rgba(101, 119, 134, 0.2);
  }
  .profile-wrap__top-section__profile-card--bottom__follow-wrap__list {
    padding: 10px 0;
    width: 100%;
    height: 170px;
    overflow-y: scroll;
  }

  /*

  api/profile/:id  다른사람의 프로필
  1. goToProfile 을 누르면 유저의 id로 row 를 찾는다
  2. profile 페이지에서는 해당 유저의 닉네임, 팔로우, 팔로워들을 알 수 있고 그 유저의 게시글들을 볼 수 있다.
  3. 팔로우를 했는지 안했는지에 따라 버튼이 다르게 보여야한다.


  api/profile  자기자신의 프로필
  1. 닉네임, 팔로우 팔로워들을 알 수 있고 자기 자신의 게시글들을 볼 수 있으며 수정도 가능하다.





  */
</style>
