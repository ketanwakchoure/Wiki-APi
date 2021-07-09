const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("article", articleSchema);

app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function(req, res) {
    const article = new Article({
      title: req.body.title,
      content: req.body.content
    });
    article.save(function(err) {
      if (err) res.send(err);
    });
  })
  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (err) res.send(err);
    });
  });

app.route("/articles/:titlename").get(function(req, res) {
    Article.findOne({
      title: req.params.titlename
    }, function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .put(function(req, res) {
    Article.update({
        title: req.params.titlename
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      },
      function(err) {
        if (err) res.send(err);
      }
    );
  })
  .patch(function(req, res) {
      Article.update(
        {
          title: req.params.titlename
        },
        {
          $set: req.body
        },
        function(err) {
          if (!err) {
            res.send("Success");
          } else {
            res.send(err);
          }
        }
      )
  })
  .delete(function(req,res){
    Article.deleteOne({title: req.params.titlename} , function(err){
      if(!err) {
        res.send("Success");
      }
      else {
        res.send(err);
      }
    })
  })

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
