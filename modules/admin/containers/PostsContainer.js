var React = require('react');
var Posts = require('../components/Posts');
var loadData = require('../utils/loadData');

var PostsContainer = React.createClass({
  getInitialState: function () {
    return {
      posts: []
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
  componentWillUpdate: function (nextProps, nextState) {
    console.log(nextState.posts.length);
  },
  handleCreateButton: function () {
    $('#myModal').modal('show');
  },
  handleMouseOvered: function (event) {
    event.target.style.cursor = "pointer";
  },
  handleMouseDown: function (event) {
    event.preventDefault();
  },
  updateData: function (config) {
    this.state.posts.push(config);
    this.setState({
      posts: this.state.posts
    });
  }, //Dynamic updating posts state
  render: function () {
    return (
      <Posts
        update={this.updateData}
        clickedCreate={this.handleCreateButton}
        mouseOvered={this.handleMouseOvered}
        listOfPosts={this.state.posts}
        mouseDown={this.handleMouseDown} />
    )
  }
});

module.exports = PostsContainer;
