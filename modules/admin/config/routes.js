var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var PostsContainer = require('../containers/PostsContainer');
var Home = require('../components/Home');
var Main = require('../components/Main');
var PostContainer = require('../containers/PostContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/posts' component={PostsContainer}>
        <Route path='/posts/:id' component={PostContainer} />
      </Route>
    </Route>
  </Router>
);

module.exports = routes;
