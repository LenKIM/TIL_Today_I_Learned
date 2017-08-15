var express = require('express');
var router = express.Router();

var ArticleProvider = require('../articleprovider-mongodb').ArticleProvider;
var articleProvider = new ArticleProvider('localhost', 27017);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    articleProvider.findAll(function(err, docs) {
      res.render('index', {title:'Blog', articles: docs});
    });
});

router.get('/blog/new', function(req, res, next){
  res.render('blog_new.jade', {title: 'New post'});
});

router.post('/blog/new',function(req,res,next) {
    articleProvider.save({title:req.param('title'),body:req.param('body')},
        function(err,docs) { res.redirect('/'); });
});

router.post('/blog/addComment',function(req,res, next) {
    articleProvider.addComment(req.param('_id'),
        {person:req.param('person'),comment:req.param('comment'),created_at:new Date()},
        function(err,docs) { res.redirect('/blog/'+req.param('_id')); });
});
router.post('/blog/removeComment', function(req,res){
    articleProvider.removeComment(
        req.param('_id'),
        {person:req.param('person'),
            comment:req.param('comment')},
        function(err,doc) {
            res.redirect('/blog/'+req.param('_id'));
        });
});

router.post('/blog/remove', function(req,res) {
    articleProvider.remove(req.param('_id'),
        function(err,doc) {
            res.redirect('/');
        });
});

router.get('/blog/:id',function(req,res) {
    articleProvider.findById(req.params.id, function(err, article) {
        res.render('blog_show.jade', {title:article.title, article:article});
    });
});

module.exports = router;