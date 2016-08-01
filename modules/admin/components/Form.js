var React = require('react');
var styles = require('../styles');

function Form (props) {
  return (
    <form className="form-horizontal" onSubmit={props.formSubmited}>
      <div className="form-group">
        <label htmlFor="inputTitle" className="col-sm-2 control-label">Title:</label>
        <div className="col-sm-10">
          <input type="title" className="form-control" id="inputTitle" placeholder="Title" value={props.valuesToForm.title} onChange={props.changedValueTitle}></input>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputBody" className="col-sm-2 control-label">Body:</label>
        <div className="col-sm-10">
          <textarea rows="10" type="body" className="form-control" id="textareaBody" placeholder="Body" value={props.valuesToForm.body} onChange={props.changedValueBody}></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-primary">Save changes</button>
          <button type="button" className="btn btn-default" onClick={props.cancelClicked}>Cancel</button>
        </div>
      </div>
    </form>
  )
}

module.exports = Form;
