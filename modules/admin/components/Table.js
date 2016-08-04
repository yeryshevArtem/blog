var React = require('react');
var TableHead = require('./TableHead');
var TableBody = require('./TableBody');

function Table (props) {
  return (
    <table className="table table-hover table-posts" onMouseDown={props.mouseDownToTableComp}>
      <TableHead />
      <TableBody
        editButtonToTbodyComp={props.editButtonToTableComp}
        deleteButtonToTbodyComp={props.deleteButtonToTableComp}
        mouseOveredToTableBodyComp={props.mouseOveredToTableComp}
        listToTbodyComp={props.listToTableComp} />
    </table>
  )
}

module.exports = Table;
