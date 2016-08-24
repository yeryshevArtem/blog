var React = require('react');
var Posts = require('../components/Posts');
var loadData = require('../utils/loadData');
var converterToLocalDate = require('../utils/converterToLocalDate');
var ModalContainer = require('./ModalContainer');

var PostsContainer = React.createClass({
  getInitialState: function () {
    return {
      posts: [],
      currentPost: undefined,
      flagToDelete: false
    }
  },
  componentDidMount: function () {
    loadData.getPosts().then(function (result) {
      converterToLocalDate.install(result.data);
      this.setState({
        posts: result.data,
        currentPost: undefined,
        flagToDelete: false
      });
    }.bind(this)).catch(function (err) {
      alert(err.message);
    });
  },
  handleEditButton: function (event) {
    var id = event.target.parentNode.parentNode.id;
    this.state.posts.forEach(function (post) {
      if (post.id.toString() === id) {
        this.setState({
          posts: this.state.posts,
          currentPost: post,
          flagToDelete: false
        });
      }
    }.bind(this));
    $('#modalPrimary').modal('show');
  },
  handleDeleteButton: function (event) {
    var id = event.target.parentNode.parentNode.id;
    this.state.posts.forEach(function (post) {
      if (post.id.toString() === id) {
        this.setState({
          posts: this.state.posts,
          currentPost: post,
          flagToDelete: true
        });
      }
    }.bind(this));
    $('#modalPrimary').modal('show');
  },
  handleCreateButton: function () {
    this.setState({
      posts: this.state.posts,
      currentPost: undefined,
      flagToDelete: false
    });
    $('#modalPrimary').modal('show');
  },
  updateData: function (config, method) {
    if (method === 'post') {
      this.state.posts.push(config);
    } else if (method === 'put') {
      this.state.posts.forEach(function (post, index) {
        if (post.id === config.id) {
          this.state.posts[index] = config;
          converterToLocalDate.install(this.state.posts);
        }
      }.bind(this));
    } else if (method === 'delete') {
      var id = config.id;
      this.state.posts.forEach(function (post, item) {
        if (post.id === id) {
          this.state.posts.splice(item, 1);
        }
      }.bind(this));
    }
    this.setState({
      posts: this.state.posts,
      currentPost: undefined,
      flagToDelete: false
    });
  },
  render: function () {
    if (this.props.params.id === undefined) {
      return (
        <div>
          <Posts
            editButtonToPostComp={this.handleEditButton}
            deleteButtonToPostComp={this.handleDeleteButton}
            clickedCreate={this.handleCreateButton}
            update={this.updateData}
            currentPost={this.state.currentPost}
            flagToDeleteForPostsComp={this.state.flagToDelete}
            listOfPosts={this.state.posts} />
        </div>
      )
    } else if (this.props.params.id !== undefined) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  }
});

module.exports = PostsContainer;
