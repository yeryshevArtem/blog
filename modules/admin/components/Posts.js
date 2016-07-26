var React = require('react');

var Posts = React.createClass({
  render: function () {
    return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>my first post</td>
            </tr>
            <tr>
              <td>2</td>
              <td>my second post</td>
            </tr>
            <tr>
              <td>3</td>
              <td>my third post</td>
            </tr>
          </tbody>
        </table>
    )
  }
});

module.exports = Posts;
