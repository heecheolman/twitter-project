const axios = require('axios');

module.exports = {
  hasNickname: ({ nickname }) => {
    axios.get('/api/nicknames/' + nickname, {
      params: { nickname },
    })
      .then((result) => {
        return result.data.length !== 0;
      })
      .catch((err) => {
        return err;
      });
  },
};
