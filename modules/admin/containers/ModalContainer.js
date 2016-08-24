var React = require('react');
var Modal = require('../components/Modal');
var Link = require('react-router').Link;
var loadData = require('../utils/loadData');
var converterToLocalDate = require('../utils/converterToLocalDate');

var ModalContainer = React.createClass({
  getInitialState: function () {
    return {
      id: '',
      title: '',
      body: '',
      createdAt: '',
      modifiedAt: ''
    }
  },
  //for autocomplete fields in modal window, when clicking on edit, state of modal component are changed
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.curPostForModalCont) {
      //modal window for edit operations
      this.setState ({
        id: nextProps.curPostForModalCont.id,
        title: nextProps.curPostForModalCont.title,
        body: nextProps.curPostForModalCont.body,
        createdAt: nextProps.curPostForModalCont.createdAt,
        modifiedAt: nextProps.curPostForModalCont.modifiedAt,
      });
    } else if (nextProps.curPostForModalCont === undefined) {
      //modal window for create operations
      this.setState ({
        id: '',
        title: '',
        body: '',
        createdAt: '',
        modifiedAt: ''
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
    var dataForSendToServer = undefined;
    var id = undefined;
    var title = this.state.title;
    var body = this.state.body;
    var now = new Date ();
    var isoDate = new Date(now).toISOString();
    var createdAt = isoDate;
    var modifiedAt = isoDate;
    
    //for create operations

    if (!this.props.curPostForModalCont && !this.props.flagToDeleteForModalCont) {
      dataForSendToServer = "title=" + title + "&body=" + body + "&createdAt=" + createdAt + "&modifiedAt=" + modifiedAt; //issue with axios
      loadData.createPost(dataForSendToServer).then(function (returnedData) {
        converterToLocalDate.create(returnedData.data);
        this.setState({
          id: returnedData.data.id,
          title: returnedData.data.title,
          body: returnedData.data.body,
          createdAt:  returnedData.data['created_at'],
          modifiedAt: returnedData.data['modified_at']
        });
        $('#modalPrimary').modal('hide');
        this.props.updateToModalCont(this.state, 'post');
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });

      //for update operations

    } else if (this.props.curPostForModalCont && !this.props.flagToDeleteForModalCont) {
      id = this.props.curPostForModalCont.id;
      dataForSendToServer = "id=" + id + "&title=" + title + "&body=" + body + "&modifiedAt=" + modifiedAt; //issue with axios
      loadData.editPost(id, dataForSendToServer).then(function (returnedData) {
        converterToLocalDate.update(returnedData.data['modified_at']);
          this.setState({
            id: returnedData.data.id,
            title: returnedData.data.title,
            body: returnedData.data.body,
            createdAt:  returnedData.data['created_at'],
            modifiedAt: returnedData.data['modified_at']
          });
        $('#modalPrimary').modal('hide');
        this.props.updateToModalCont(this.state, 'put');
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });

      // for delete operations

    } else if (this.props.curPostForModalCont && this.props.flagToDeleteForModalCont) {
      id = this.props.curPostForModalCont.id;
      loadData.deletePost(id).then(function () {
        $('#modalPrimary').modal('hide');
        setTimeout(function () {
          this.props.updateToModalCont({id: id}, 'delete');
        }.bind(this), 150);
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });
    }
  },
  handleCancel: function () {
    if (this.props.flagToDeleteForModalCont === true) {
      $('#modalPrimary').modal('hide');
      setTimeout(function () {
        this.props.updateToModalCont();
      }.bind(this), 150);
    } else {
      $('#modalPrimary').modal('hide');
    }
  },
  render: function () {
    return (
      <Modal
        flagToDeleteForModalComp={this.props.flagToDeleteForModalCont}
        saveChangeClicked={this.handleSaveButton}
        changedTitle={this.handleTitleChange}
        changedBody={this.handleBodyChange}
        valuesToModal={this.state}
        cancel={this.handleCancel} />
    )
  }
});

module.exports = ModalContainer;
