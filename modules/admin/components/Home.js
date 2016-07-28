var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainContainer = require('./MainContainer');

function Home () {
  return (
    <MainContainer>
      <h1>Welcome to blog!</h1>
      <Link to="/posts">Posts</Link>
    </MainContainer>
  )
}

module.exports = Home;
