var React = require('react');

function MainContainer (props) {
  return (
    <div className="col-sm-12">
      {props.children}
    </div>
  )
}

module.exports = MainContainer;
