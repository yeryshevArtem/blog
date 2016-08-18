var React = require('react');
var Navbar = require('./Navbar');
var MainContainer = require('./MainContainer');
var styles = require('../styles');
var ModalContainer = require('../containers/ModalContainer');
var Table = require('./Table');

function Posts (props) {
  return (
    <MainContainer>
      <Navbar />
      <ModalContainer
        listToModalCont={props.listOfPosts}
        flagToDeleteForModalCont={props.flagToDeleteForPostsComp}
        curPostForModalCont={props.curPostForPostComp}
        updateToModalCont={props.update} />
      <div className='col-sm-12 top-button' style={styles.space}>
        <button type="button" className="btn btn-primary btn-create" onClick={props.clickedCreate}>
          New post
        </button>
      </div>
      <div className='col-sm-12' style={styles.space}>
        <Table
          className="table table-hover table-posts"
          editButtonToTableComp={props.clickedEdit}
          deleteButtonToTableComp={props.clickedDelete}
          mouseDownToTableComp={props.mouseDown}
          mouseOveredToTableComp={props.mouseOvered}
          listToTableComp={props.listOfPosts} />
      </div>
    </MainContainer>
  )
}

module.exports = Posts;
