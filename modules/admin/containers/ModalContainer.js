var React = require('react');
var Modal = require('../components/Modal');
var Link = require('react-router').Link;
var loadData = require('../utils/loadData');

var ModalContainer = React.createClass({
  getInitialState: function () {
    return {
      id: '',
      title: '',
      body: ''
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.curPostForModalCont) {
      this.setState ({
        id: nextProps.curPostForModalCont.id,
        title: nextProps.curPostForModalCont.title,
        body: nextProps.curPostForModalCont.body
      });
    } else if (nextProps.curPostForModalCont == undefined) {
      this.setState ({
        id: '',
        title: '',
        body: ''
      });
    }
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleBodyChange: function(e) {
    this.setState({body: e.target.value});
  },
  handleSaveButton: function () {

    //for create operations

    if (!this.props.curPostForModalCont) {
      var dataForSendToServer = undefined;
      var title = this.state.title;
      var body = this.state.body;
      dataForSendToServer = "title=" + title + "&body=" + body; //issue with axios
      loadData.createPost(dataForSendToServer).then(function (returnedData) {
        this.setState({
          id: returnedData.data.id,
          title: returnedData.data.title,
          body: returnedData.data.body
        });
        $('#myModal').modal('hide');
        this.props.updateToModalCont(returnedData.data, returnedData);
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });

      //for update operations
      
    } else {
      var dataForSendToServer = undefined;
      var id = this.props.curPostForModalCont.id;
      var title = this.state.title;
      var body = this.state.body;
      dataForSendToServer = "id=" + id + "&title=" + title + "&body=" + body; //issue with axios
      loadData.editPost(id, dataForSendToServer).then(function (returnedData) {
        $('#myModal').modal('hide');
        this.props.updateToModalCont(returnedData.data, returnedData);
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });
    }
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
