var React = require('react');
var Navbar = require('./Navbar');
var MainContainer = require('./MainContainer');
var styles = require('../styles');
var Modal = require('../components/Modal');
var PostRow = require('./PostRow');

function Posts (props) {
  var rowsOfPosts = props.listOfPosts.map(function (post, key) {
    return <PostRow key={post.id} data={post} />
  });
  return (
    <MainContainer>
      <Navbar />
      <Modal />
      <div className='col-sm-12' style={styles.space}>
        <button type="button" className="btn btn-primary" onClick={props.clickedCreate}>
          Create
        </button>
      </div>
      <table className="table table-hover" onMouseDown={props.mouseDown}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody onMouseOver={props.mouseOvered}>
          {rowsOfPosts}
        </tbody>
      </table>
    </MainContainer>
  )
}

module.exports = Posts;
