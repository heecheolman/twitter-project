import axios from 'axios';

const state = {
  text: '',
  file: {
    // hasFile: false,
    previewList: [],
    filenameList: [],
  },
  user: {
    id: null,
    nickname: '',
  },
  content: {
    contentList: [],
  }
};

const mutations = {
  addFormImageList(state, payload) {
    state.file.previewList.push({
      id: payload.fileId,
      file: payload.file,
    });
    console.log(state.file.previewList);
  },
  removeFormImageList(state, payload) {
    state.file.previewList = state.file.previewList.filter((ele) => {
      return ele.id !== payload;
    });
    // 아무것도없을 때
    if(state.file.previewList.length === 0) {
      state.file.previewList = [];
    }
  },
  setTextContent(state, payload){
    state.text = payload;
  },
  clearContents(state) {
    state.file.previewList = [];
    state.file.filenameList = [];
    state.text = '';
  },
};

const getters = {
  getHasFile: state => state.file.previewList.length !== 0,
  getTextContent: state => state.text,
  getContentList: state => state.content.contentList,
  getUserId: state => state.user.id,
};

const actions = {
  uploadFile() {
    if(state.file.previewList.length !== 0) {
      let formData = new FormData();
      for(let it = 0; it < state.file.previewList.length; it++) {
        state.file.filenameList.push({ filename: state.file.previewList[it].file.name });
        formData.append('userfile', state.file.previewList[it].file);
      }
      try {
        axios.post('/api/upload',
          formData, {
            timeout: 1000,
          },);
      } catch (err) {
        console.error(err);
      }
    }
  },
  async uploadText() {
    try {
      await axios.post('/api/tweet', {
        user_id: state.user.id,
        nickname: state.user.nickname,
        text: state.text,
        filenameList: state.file.filenameList,
      }, {
        timeout: 500,
      });
    } catch (err) {
      console.error(err);
    }
  },
  async getTimelines() {
    await axios.get(`/api/timelines/${state.user.id}`, {
      params: {
        user_id: state.user.id,
      },
    })
      .then((result) => {
        state.content.contentList = result.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
