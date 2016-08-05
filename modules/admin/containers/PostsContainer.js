var React = require('react');
var Posts = require('../components/Posts');
var loadData = require('../utils/loadData');
var converterToLocalDate = require('../utils/converterToLocalDate');
var ModalContainer = require('./ModalContainer');

var PostsContainer = React.createClass({
  getInitialState: function () {
    return {
      posts: [],
      curPost: undefined,
      flagToDelete: false
    }
  },
  componentDidMount: function () {
    loadData.getPosts().then(function (result) {
      converterToLocalDate.install(result.data);
      this.setState({
        posts: result.data
      });
    }.bind(this)).catch(function (err) {
      alert(err.message);
    });
  },
  // componentWillReceiveProps: function (nextProps) {
  //   console.log(nextProps);
  // },
  handleMouseOvered: function (event) {
    event.target.style.cursor = "pointer";
  },
  handleMouseDown: function (event) {
    event.preventDefault();
  },
  handleCreateButton: function () {
    this.setState({
      posts: this.state.posts,
      curPost: undefined
    });
    $('#modalPrimary').modal('show');
  },
  handleEditButton: function (event) {
    var id = event.target.parentNode.parentNode.id;
    this.state.posts.forEach(function (post) {
      if (post.id == id) {
        this.setState({
          posts: this.state.posts,
          curPost: post
        });
      }
    }.bind(this));
    $('#modalPrimary').modal('show');
  },
  handleDeleteButton: function (event) {
    var id = event.target.parentNode.parentNode.id;
    this.state.posts.forEach(function (post) {
      if (post.id == id) {
        this.setState({
          posts: this.state.posts,
          curPost: post,
          flagToDelete: true
        });
      }
    }.bind(this));
    $('#modalPrimary').modal('show');
  },
  updateData: function (config, method) {
    if (method.config.method === 'post') {
      this.state.posts.push(config);
      this.setState({
        posts: this.state.posts
      });
    } else if (method.config.method === 'put') {
      this.state.posts.forEach(function (post, index) {
        if (post.id == config.id) {
          this.state.posts[index] = config;
          converterToLocalDate.install(this.state.posts);
          this.setState({
            posts: this.state.posts,
            curPost: undefined
          });
        }
      }.bind(this));
    } else {
      this.setState({
        posts: config.posts,
        curPost: config.curPost,
        flagToDelete: config.flagToDelete
      });
    }
  },
  render: function () {
    if (this.props.params.id === undefined && this.state.curPost === undefined && this.state.flagToDelete === false) {
      return (
        <div>
          <Posts
            flagToDeleteForPostsComp={this.state.flagToDelete}
            update={this.updateData}
            clickedCreate={this.handleCreateButton}
            mouseOvered={this.handleMouseOvered}
            listOfPosts={this.state.posts}
            mouseDown={this.handleMouseDown}
            clickedEdit={this.handleEditButton}
            clickedDelete={this.handleDeleteButton} />
        </div>
      )
    } else if (this.props.params.id !== undefined) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else if (this.state.curPost !== undefined && this.state.flagToDelete === false) {
      return (
        <div>
          <Posts
            flagToDeleteForPostsComp={this.state.flagToDelete}
            curPostForPostComp={this.state.curPost}
            update={this.updateData}
            clickedCreate={this.handleCreateButton}
            mouseOvered={this.handleMouseOvered}
            listOfPosts={this.state.posts}
            mouseDown={this.handleMouseDown}
            clickedEdit={this.handleEditButton}
            clickedDelete={this.handleDeleteButton} />
        </div>
      )
    } else if (this.state.curPost !== undefined && this.state.flagToDelete === true) {
      return (
        <div>
          <Posts
            flagToDeleteForPostsComp={this.state.flagToDelete}
            curPostForPostComp={this.state.curPost}
            update={this.updateData}
            clickedCreate={this.handleCreateButton}
            mouseOvered={this.handleMouseOvered}
            listOfPosts={this.state.posts}
            mouseDown={this.handleMouseDown}
            clickedEdit={this.handleEditButton}
            clickedDelete={this.handleDeleteButton} />
        </div>
      )
    }
  }
});

module.exports = PostsContainer;
