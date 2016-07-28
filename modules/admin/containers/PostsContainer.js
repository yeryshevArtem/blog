var React = require('react');
var Posts = require('../components/Posts');

var PostsContainer = React.createClass({
  handleCreateButton: function () {
    $('#myModal').modal('show');
  },
  handleMouseOvered: function (event) {
    event.target.style.cursor = "pointer";
  },
  render: function () {
    return (
      <Posts
        clickedCreate={this.handleCreateButton}
        mouseOvered={this.handleMouseOvered}/>
    )
  }
});

module.exports = PostsContainer;
