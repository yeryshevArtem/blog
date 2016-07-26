var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
  render: function () {
    return (
      <div className="col-sm-12">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <ul className="nav navbar-nav">
              <li><Link to="/posts">Posts</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
});

module.exports = Home;
