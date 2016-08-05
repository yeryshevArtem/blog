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
      this.setState ({
        id: nextProps.curPostForModalCont.id,
        title: nextProps.curPostForModalCont.title,
        body: nextProps.curPostForModalCont.body,
        createdAt: this.state.createdAt,
        modifiedAt: this.state.modifiedAt,
      });
    } else if (nextProps.curPostForModalCont === undefined) {
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

    //for create operations

    if (!this.props.curPostForModalCont && this.props.flagToDeleteForModalCont === false) {
      var dataForSendToServer = undefined;
      var title = this.state.title;
      var body = this.state.body;
      var now = new Date ();
      var isoDate = new Date(now).toISOString();
      var createdAt = isoDate;
      var modifiedAt = isoDate;
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
        // console.log(this.state);
      //   $('#modalPrimary').modal('hide');
      //   this.props.updateToModalCont(returnedData.data, returnedData);
      // }.bind(this)).catch(function (err) {
      //   alert(err.message);
      // });
      $('#modalPrimary').modal('hide');
      this.props.updateToModalCont(this.state, {config: {method: 'post'}});
    }.bind(this)).catch(function (err) {
      alert(err.message);
    });

      //for update operations

    } else if (this.props.curPostForModalCont && this.props.flagToDeleteForModalCont === false) {
      var dataForSendToServer = undefined;
      var id = this.props.curPostForModalCont.id;
      var title = this.state.title;
      var body = this.state.body;
      var now = new Date ();
      var isoDate = new Date(now).toISOString();
      var modifiedAt = isoDate;
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
        this.props.updateToModalCont(this.state, returnedData);
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });

      // for delete operations

    } else if (this.props.curPostForModalCont && this.props.flagToDeleteForModalCont === true) {
      var id = this.props.curPostForModalCont.id;
      var listOfPosts = this.props.listToModalCont;
      loadData.deletePost(id).then(function () {
        listOfPosts.forEach(function (post, item) {
          if (post.id === id) {
            listOfPosts.splice(item, 1)
          }
        });
        $('#modalPrimary').modal('hide');
        setTimeout(function () {
          this.props.updateToModalCont({
            posts: listOfPosts,
            curPost: undefined,
            flagToDelete: false
          }, {
            config: {
              method: 'delete'
            }
          });
        }.bind(this), 150);
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });
    }
  },
  handleCancel: function () {
    if (this.props.flagToDeleteForModalCont == true) {
      $('#modalPrimary').modal('hide');
      setTimeout(function () {
        this.props.updateToModalCont({
          posts: this.props.listToModalCont,
          curPost: undefined,
          flagToDelete: false
        }, {
            config: {
              method: 'delete'
            }
        });
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
