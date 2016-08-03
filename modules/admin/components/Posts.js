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
        curPostForModalCont={props.curPostForPostComp}
        updateToModalCont={props.update} />
      <div className='col-sm-12' style={styles.space}>
        <button type="button" className="btn btn-primary btn-create" onClick={props.clickedCreate}>
          Create
        </button>
      </div>
      <div className='col-sm-12' style={styles.space}>
        <Table
          className="table table-hover table-posts"
          editButtonToTableComp={props.clickedEdit}
          mouseDownToTableComp={props.mouseDown}
          mouseOveredToTableComp={props.mouseOvered}
          listToTableComp={props.listOfPosts} />
      </div>
    </MainContainer>
  )
}

module.exports = Posts;
