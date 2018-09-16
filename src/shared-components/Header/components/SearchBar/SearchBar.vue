<template>
  <form action="" class="search-form">
    <input class="search-form__search" type="text" placeholder="트위터 검색하기" v-model="searchToken">
    <div class="search-form__icon">
      <button class="search-form__icon--search">
        <svg x="0px" y="0px" viewBox="0 0 451 451" class="icon--search">
          <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3   s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4   C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3   s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" fill="#66757f"/>
        </svg>
      </button>
    </div>
    <div v-show="doSearching" class="search-form__drop-down">
      <div class="search-form__drop-down__arrow-box">
      </div>
      <div class="search-form__drop-down__searched-box">
        <ul>
          <nickname-list
            v-for="(user, index) in nicknameList"
            :user="user"
            :key="index" />
        </ul>
      </div>
    </div>
  </form>
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import NicknameList from './components/NicknameList';
import { mapGetters } from 'vuex';

export default {
  name: 'SearchBar',
  components: {
    NicknameList,
  },
  watch: {
    searchToken: function() {
      // this.$store.commit('main/setSearchToken', this.searchToken);
      // await this.$store.dispatch('main/searchNicknameList');
      this.searchUserData();
    },
  },
  computed: {
    // ...mapGetters({
    //   getNicknameList: 'main/getNicknameList',
    // }),
    // getNicknameList() {
    //   // console.log('nicknamelist is');
    //   // console.log(this.$store.getters['main/getNicknameList']);
    //   this.nicknameList = this.$store.getters['main/getNicknameList'];
    //   return this.nicknameList;
    // },
    doSearching() {
      return this.searchToken.length !== 0;
    },
  },
  data() {
    return {
      searchToken: '',
      nicknameList: [],
    };
  },
  methods: {
    searchUserData: _.debounce(function() {
      console.log('1');
      if(this.searchToken.length !== 0) {
        const userId = this.$store.getters['main/getUserId'];
        axios.get(`/api/${userId}/nickname-list/${this.searchToken}`, {
          params: {
            id: userId,
            input: this.searchToken,
          },
        })
          .then((result) => {
            this.nicknameList = result.data;
            // Eventbus.$emit('updateNicknameList', result.data);
          })
          .catch((err) => {
            console.error(err);
          })
      }
    }, 500)
  },
};
</script>
<style scoped>
  /* Moblie Device */
  @media screen and (max-width: 425px) {
  }
  /* Tablet Device */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
  }
  /* Desktop Device */
  @media screen and (min-width: 1025px) {
  }

  svg {
    width: inherit;
    height: inherit;
  }

  .search-form {
    display: block;
    position: relative;
    float: left;
    height: 33px;
    margin: 5px 15px 0 0;
    font-size: 12px;
    width: 221px;
  }
  .search-form__icon {
    display: block;
    position: absolute;
    right: 10px;
    top: 9px;
  }
  .search-form__icon--search {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
  .icon--search {
    width: 14px;
    height: 14px;
  }
  .search-form__search {
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
  .search-form__search:focus {
    background-color: #fff;
    border: 2px solid #4AB3F4;
  }
  .search-form__drop-down__arrow-box {
    /*width: 18px;*/
    /*height: 10px;*/
    /*position: absolute;*/
    /*top: -10px;*/
    /*left: 12px;*/
    width: 18px;
    height: 10px;
    /*float: left;*/
    overflow: hidden;
  }
  .search-form__drop-down__searched-box {
    /*width: 316px;*/
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    background-clip: padding-box;
    z-index: 999;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
