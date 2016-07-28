var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function Navbar () {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <ul className="nav navbar-nav">
          <li><Link to="/">Blog</Link></li>
          <li><Link to="/posts">Posts</Link></li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = Navbar;
