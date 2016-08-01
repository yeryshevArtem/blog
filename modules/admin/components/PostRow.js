var React = require('react');
var ReactRouter = require('react-router');

function PostRow (props) {
  return (
    <tr>
      <td>{props.postToPostRowComp.id}</td>
      <td>{props.postToPostRowComp.title}</td>
    </tr>
  )
}

module.exports = PostRow;
