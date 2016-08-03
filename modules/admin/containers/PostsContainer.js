var React = require('react');
var Posts = require('../components/Posts');
var loadData = require('../utils/loadData');
var ModalContainer = require('./ModalContainer');

var PostsContainer = React.createClass({
  getInitialState: function () {
    return {
      posts: [],
      curPost: undefined
    }
  },
  componentDidMount: function () {
    loadData.getPosts().then(function (result) {
      this.setState({
        posts: result.data
      });
    }.bind(this)).catch(function (err) {
      alert(err.message);
    });
  },
  handleCreateButton: function () {
    this.setState({
      posts: this.state.posts,
      curPost: undefined
    });
    $('#myModal').modal('show');
  },
  handleMouseOvered: function (event) {
    event.target.style.cursor = "pointer";
  },
  handleMouseDown: function (event) {
    event.preventDefault();
  },
  handleEditButton: function (event) {
    var self = this;
    var id = event.target.parentNode.parentNode.id;
    this.state.posts.forEach(function (post) {
      if (post.id == id) {
        self.setState({
          posts: self.state.posts,
          curPost: post
        });
      }
    });
    $('#myModal').modal('show');
  },
  updateData: function (config, method) {
    if (method.config.method === 'post') {
      this.state.posts.push(config);
      this.setState({
        posts: this.state.posts
      });
    } else {
      var self = this;
      this.state.posts.forEach(function (post, index) {
        if (post.id == config.id) {
          self.state.posts[index] = config;
          self.setState({
            posts: self.state.posts,
            curPost: undefined
          });
        }
      });
    }
  },
  render: function () {
    if (this.props.params.id === undefined && this.state.curPost === undefined) {
      return (
        <div>
          <Posts
            update={this.updateData}
            clickedCreate={this.handleCreateButton}
            mouseOvered={this.handleMouseOvered}
            listOfPosts={this.state.posts}
            mouseDown={this.handleMouseDown}
            clickedEdit={this.handleEditButton} />
        </div>
      )
    } else if (this.props.params.id != undefined) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else if (this.state.curPost != undefined) {
      return (
        <div>
          <Posts
            curPostForPostComp={this.state.curPost}
            update={this.updateData}
            clickedCreate={this.handleCreateButton}
            mouseOvered={this.handleMouseOvered}
            listOfPosts={this.state.posts}
            mouseDown={this.handleMouseDown}
            clickedEdit={this.handleEditButton} />
        </div>
      )
    }
  }
});

module.exports = PostsContainer;
