var React = require('react');
var Navbar = require('../components/Navbar');
var MainContainer = require('../components/MainContainer');
var loadData = require('../utils/loadData');

var Post = React.createClass({
  getInitialState: function () {
    return {
      post: {
        id: '',
        title: '',
        body: ''
      }
    }
  },
  componentDidMount: function () {
    loadData.getPost(this.props.params.id).then(function (result) {
      this.setState({
        post: result.data
      });
    }.bind(this)).catch(function (err) {
      alert(err.message);
    });
  },
  render: function () {
    return (
      <MainContainer>
        <Navbar />
        <h1>{this.state.post.title}</h1>
        <p><strong>Body:</strong> {this.state.post.body}</p>
      </MainContainer>
    )
  }
});

module.exports = Post;
