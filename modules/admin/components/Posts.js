var React = require('react');
var Navbar = require('./Navbar');
var MainContainer = require('./MainContainer');
var styles = require('../styles');
var ModalContainer = require('../containers/ModalContainer');
var TableContainer = require('../containers/TableContainer');

function Posts (props) {
  return (
    <MainContainer>
      <Navbar />
      <ModalContainer
        listToModalCont={props.listOfPosts}
        flagToDeleteForModalCont={props.flagToDeleteForPostsComp}
        curPostForModalCont={props.currentPost}
        updateToModalCont={props.update} />
      <div className='col-sm-12 top-button' style={styles.space}>
        <button type="button" className="btn btn-primary btn-create" onClick={props.clickedCreate}>
          New post
        </button>
      </div>
      <div className='col-sm-12' style={styles.space}>
        <TableContainer
          className="table table-hover table-posts"
          editButtonToTableCont={props.editButtonToPostComp}
          deleteButtonToTableCont={props.deleteButtonToPostComp}
          updateToTableCont={props.update}
          listToTableCont={props.listOfPosts} />
      </div>
    </MainContainer>
  )
}

module.exports = Posts;
