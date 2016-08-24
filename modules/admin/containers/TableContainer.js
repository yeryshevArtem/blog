var React = require('react');
var Table = require('../components/Table');

var TableContainer = React.createClass({
  getInitialState: function () {
    return {
      posts: this.props.listToTableCont
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      posts: nextProps.listToTableCont
    });
  },

  handleMouseOvered: function (event) {
    event.target.style.cursor = "pointer";
  },
  
  handleMouseDown: function (event) {
    event.preventDefault();
  },

  render: function () {
    return (
      <Table
        editButtonToTableComp={this.props.editButtonToTableCont}
        deleteButtonToTableComp={this.props.deleteButtonToTableCont}
        mouseDownToTableComp={this.handleMouseDown}
        mouseOveredToTableComp={this.handleMouseOvered}
        listToTableComp={this.state.posts}/>
    )
  }
})

module.exports = TableContainer;
