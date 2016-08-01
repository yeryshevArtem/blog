var React = require('react');
var PostRow = require('./PostRow');

function TableBody (props) {
  var rowsOfPosts = props.listToTbodyComp.map(function (post, key) {
    return <PostRow key={post.id} postToPostRowComp={post} />
  });
  return (
    <tbody onMouseOver={props.mouseOveredToTableBodyComp}>
      {rowsOfPosts}
    </tbody>
  )
}

module.exports = TableBody;
