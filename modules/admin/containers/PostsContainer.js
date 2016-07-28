var React = require('react');
var Posts = require('../components/Posts');

var PostsContainer = React.createClass({
  getInitialState: function () {
    return {
      posts: []
    }
  },
  componentDidMount: function() {
    var urlToListOfPosts = 'http://192.168.33.11:8000/api/posts';
    this.serverRequest = $.get(urlToListOfPosts, function (result) {
      this.setState({
        posts: result
      });
    }.bind(this));
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
  render: function () {
    return (
      <Posts
        clickedCreate={this.handleCreateButton}
        mouseOvered={this.handleMouseOvered}
        listOfPosts={this.state.posts}
        mouseDown={this.handleMouseDown}/>
    )
  }
});

module.exports = PostsContainer;
