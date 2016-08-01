var React = require('react');
var Form = require('./Form');

function Modal (props) {
  return (
    <div className="modal fade" tabIndex="-1" role="dialog" id="myModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Modal title</h4>
          </div>
          <div className="modal-body">
            <Form
              formSubmited={props.saveChangeClicked}
              changedValueTitle={props.changedTitle}
              changedValueBody={props.changedBody}
              valuesToForm={props.valuesToModal}
              cancelClicked={props.cancel} />
          </div>
        </div>
      </div>
    </div>
  )
}

module.exports = Modal;
