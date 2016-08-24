var converterToLocalDate = {
  install: function (arrayOfPosts) {
    arrayOfPosts.forEach(function (post, indexOfPost) {
      post.createdAt = (new Date(post.createdAt)).toLocaleString();
      post.modifiedAt = (new Date(post.modifiedAt)).toLocaleString();
    });
  },
  create: function (post) {
    post['created_at'] = (new Date(post['created_at'])).toLocaleString();
    post['modified_at'] = (new Date(post['modified_at'])).toLocaleString();
  },
  update: function (post) {
    post['modified_at'] = (new Date(post['modified_at'])).toLocaleString();
  }
}

module.exports = converterToLocalDate;
