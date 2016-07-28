var React = require('react');
var Navbar = require('./Navbar');
var MainContainer = require('./MainContainer');
var styles = require('../styles');
var Modal = require('../components/Modal');

function Posts (props) {
  return (
    <MainContainer>
      <Navbar />
      <Modal />
      <div className='col-sm-12' style={styles.space}>
        <button type="button" className="btn btn-primary" onClick={props.clickedCreate}>
          Create
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody onMouseOver={props.mouseOvered}>
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
    </MainContainer>
  )
}

module.exports = Posts;
