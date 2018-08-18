<template>
  <form action="" class="form--search">
    <input-field
      :class="fieldStyle"
      :placeholder="placeholder"
      :type="inputType"/>
    <div class="form--search__svg">
      <svg-button
        :svg-button-style="svgButtonStyle"
        :svg="svg" />
    </div>
    <div class="dropdown">
      <div class="arrow-box">
        <!--<div class="arrow-box&#45;&#45;base arrow-box__outer">-->
        <!--</div>-->
        <!--<div class="arrow-box&#45;&#45;base arrow-box__inner">-->
        <!--</div>-->
      </div>
      <div class="searched-box" v-show="showDropDown">
        <div class="list-box">
          <ul>
            <nickname-list
              v-for="(user, index) in nicknameList"
              :user="user"
              :key="index" />
          </ul>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import InputField from '../atoms/InputField';
import SvgButton from './../atoms/SvgButton';
import Eventbus from './../../lib/Eventbus';
import NicknameList from './../atoms/NicknameList';

export default {
  name: 'SearchBar',
  components: {
    InputField,
    SvgButton,
    NicknameList,
  },
  created() {
    Eventbus.$on('toggleOn', this.toggleOn);
    Eventbus.$on('toggleOff', this.toggleOff);
    Eventbus.$on('updateNicknameList', this.updateNicknameList);
  },
  data() {
    return {
      showDropDown: false,
      nicknameList: [],
      inputType: 'text',
      fieldStyle: 'input--search',
      placeholder: '트위터 검색하기',
      svgButtonStyle: 'svg--search',
      svg: `<svg x="0px" y="0px" viewBox="0 0 451 451" class="svg--search">
            <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3   s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4   C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3   s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" fill="#66757f"/>
          </svg>`,
    }
  },
  methods: {
    toggleOn() {
      this.showDropDown = true;
    },
    toggleOff() {
      this.showDropDown = false;
    },
    updateNicknameList(lists) {
      this.nicknameList = lists;
    },
  }
};
</script>
<style scoped>
  .form--search {
    display: block;
    position: relative;
    float: left;
    height: 33px;
    margin: 5px 15px 0 0;
    font-size: 12px;
    width: 221px;
  }
  .form--search__svg {
    display: block;
    position: absolute;
    right: 10px;
    top: 9px;
  }
  .dropdown {
  }
  .arrow-box {
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
  .searched-box {
    width: 316px;
    border-radius: 4px;
    background-color: #fff;
    background-clip: padding-box;
    z-index: 999;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  }

  .arrow-box--base {
    position: absolute;
    display: inline-block;
    margin-left: -1px;
  }
  .arrow-box__outer {
    border-bottom: 10px solid #657786;
    border-bottom-color: rgba(0,0,0,0.1);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: auto;
    width: auto;
  }
  .arrow-box__inner {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #fff;
    border-bottom-color: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
