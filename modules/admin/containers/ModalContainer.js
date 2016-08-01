var React = require('react');
var Modal = require('../components/Modal');
var Link = require('react-router').Link;
var loadData = require('../utils/loadData');

var ModalContainer = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      body: ''
    }
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextState.title !== this.state.title || nextState.body !== this.state.body) {
      return true
    } else {
      return false
    }
  },
  componentWillReceiveProps: function (nextProps) {
    console.log(nextProps);
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleBodyChange: function(e) {
    this.setState({body: e.target.value});
  },
  handleSaveButton: function () {
    var dataForSendToServer = undefined;
    var title = this.state.title;
    var body = this.state.body;
    dataForSendToServer = "title=" + title + "&body=" + body; //issue with axios
    loadData.createPost(dataForSendToServer).then(function (returnedData) {
      $('#myModal').modal('hide');
      this.props.updateToModalCont(returnedData.data);
    }.bind(this)).catch(function (err) {
        alert(err.message);
      });
  },
  handleCancel: function () {
    $('#myModal').modal('hide');
  },
  render: function () {
    return (
      <Modal
        saveChangeClicked={this.handleSaveButton}
        changedTitle={this.handleTitleChange}
        changedBody={this.handleBodyChange}
        valuesToModal={this.state}
        cancel={this.handleCancel} />
    )
  }
});

module.exports = ModalContainer;
