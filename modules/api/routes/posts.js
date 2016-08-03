var express = require('express');
var router = express.Router();

var posts = undefined;
module.exports = router;
module.exports.configure = function (params) {
  posts = params.model;
}

 // get list all posts
router.get('/posts', function (req, res, next) {
  posts.titles(function (err, data) {
    var responseData = undefined;
    if (err) {
      var errorMessage = {
        id: "Get failed",
        description: "Maybe ID not found or invalid!"
      };
      responseData = JSON.stringify(errorMessage);
      res.statusCode = 404;
      res.end(responseData);
    } else {
      responseData = JSON.stringify(data);
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      });
      res.end(responseData);
    }
  });
});

 // get the post with that id
router.get('/posts/:id', function (req, res, next) {
  posts.read(req.params.id, function (err, data) {
    var responseData = undefined;
    if (err) {
      var errorMessage = {
        id: "Get failed",
        description: "Maybe ID not found or invalid!"
      };
      responseData = JSON.stringify(errorMessage);
      res.statusCode = 404;
      res.end(responseData);
    } else {
      responseData = JSON.stringify(data[0]);
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      });
      res.end(responseData);
    }
  });
});

// create post
router.post('/posts', function (req, res, next) {
  posts.create(req.body.title, req.body.body, function (err, data) {
    var responseData = undefined;
    var id = undefined;
    if (err) {
      var errorMessage = {
        id: "Create failed",
        description: "Failed to create. Maybe resource already exists!"
      };
      responseData = JSON.stringify(errorMessage);
      res.statusCode = 409;
      res.end(responseData);
    } else {
      id = data[0].id;
      posts.read(id, function (err, data) {
        var responseData = undefined;
        if (err) {
          var errorMessage = {
            id: "Create failed",
            description: "Failed to create!"
          };
          responseData = JSON.stringify(errorMessage);
          res.statusCode = 404;
          res.end(responseData);
        } else {
          responseData = JSON.stringify(data[0]);
          res.writeHead(201, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Location": "localhost:3000/api/posts/" + id
          });
          res.end(responseData);
        }
      });
    }
  });
});

//update post
router.put('/posts/:id', function (req, res, next) {
  posts.update(req.params.id, req.body.title, req.body.body, function (err) {
    var responseData = undefined;
    if (err) {
      var errorMessage = {
        id: "Edit failed",
        description: "Failed to edit. Maybe ID not found or invalid!"
      };
      responseData = JSON.stringify(errorMessage);
      res.statusCode = 404;
      res.end(responseData);
    } else {
      res.statusCode = 204;
      res.end();
    }
  });
});

//delete post
router.delete('/posts/:id', function (req, res, next) {
  posts.destroy(req.params.id, function (err, data) {
    var responseData = undefined;
    if (err) {
      var errorMessage = {
        id: "Delete failed",
        description: "Failed to delete. Maybe ID not found or invalid. Also, the resource could be already deleted!"
      };
      responseData = JSON.stringify(errorMessage);
      res.statusCode = 404;
      res.end(responseData);
    } else {
      res.statusCode = 204;
      res.end();
    }
  });
});
