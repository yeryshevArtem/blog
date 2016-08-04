var React = require('react');
var Form = require('./Form');

function Modal (props) {
  return (
    <div className="modal fade" tabIndex="-1" role="dialog" id="modalPrimary">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Modal title</h4>
          </div>
          <div className="modal-body">
            {props.flagToDeleteForModalComp ?
              <div>
                <div>
                  <p>If you click on the delete, all data will be deleted. Are you sure ?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={props.saveChangeClicked}>Save changes</button>
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={props.cancel}>Close</button>
                </div>
              </div> :
              <div>
                <Form
                  formSubmited={props.saveChangeClicked}
                  changedValueTitle={props.changedTitle}
                  changedValueBody={props.changedBody}
                  valuesToForm={props.valuesToModal}
                  cancelClicked={props.cancel} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

module.exports = Modal;
