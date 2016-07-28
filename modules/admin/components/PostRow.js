var React = require('react');

function PostRow (props) {
  return (
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.title}</td>
    </tr>
  )
}

module.exports = PostRow;
