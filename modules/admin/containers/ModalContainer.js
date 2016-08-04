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
    // console.log(nextProps);
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

    if (!this.props.curPostForModalCont && this.props.flagToDeleteForModalCont === false) {
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
        $('#modalPrimary').modal('hide');
        this.props.updateToModalCont(returnedData.data, returnedData);
      }.bind(this)).catch(function (err) {
        alert(err.message);
      });

      //for update operations

    } else if (this.props.curPostForModalCont && this.props.flagToDeleteForModalCont === false) {
      var dataForSendToServer = undefined;
      var id = this.props.curPostForModalCont.id;
      var title = this.state.title;
      var body = this.state.body;
      dataForSendToServer = "id=" + id + "&title=" + title + "&body=" + body; //issue with axios
      loadData.editPost(id, dataForSendToServer).then(function (returnedData) {
        $('#modalPrimary').modal('hide');
        this.props.updateToModalCont(returnedData.data, returnedData);
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
