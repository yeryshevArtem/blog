var axios = require('axios');
var config = {
  url: 'http://192.168.33.11:8000/api/posts/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

var loadData = {
  getPosts: function () {
    return axios.get(config.url);
  },
  createPost: function (dataForPostRequest) {
    return axios.post(config.url, dataForPostRequest, config);
  },
  getPost: function (id) {
    return axios.get(config.url + id);
  }
}

module.exports = loadData;
