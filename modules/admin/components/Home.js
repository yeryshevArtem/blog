var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainContainer = require('./MainContainer');

function Home () {
  return (
    <MainContainer>
      <h1>Welcome to blog!</h1>
      <Link to="/posts"><button type="button" className="btn btn-default">Posts</button></Link>
    </MainContainer>
  )
}

module.exports = Home;
