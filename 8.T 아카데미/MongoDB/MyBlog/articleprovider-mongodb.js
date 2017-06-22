/**
 * Created by len on 2017. 4. 17..
 */


const DB = require('mongodb').Db;
const Connection = require('mongodb').Connection;
const Server = require('mongodb').Server;
const BSON = require('mongodb').BSON;
const ObjectId = require('mongodb').ObjectID;

ArtiCleProvider = function (host, port) {
    this.db = new DB('text',
    new Server(host, port, {auto_reconnection: true}),
        {safe:false});
    this.db.open(function(err){
        if (!err) console.log('connected' + host + port);
        else console.log(err);
    });
};
ArtiCleProvider.prototype.getCollection = function(callback) {
    this.db.collection('articles', function (err, article_collection) {
        if (err) callback(err);
        else callback (null, article_collection);
    });
};

ArtiCleProvider.prototype.findAll = function (callback) {
    this.getCollection(function(err, article_collection) {
        if(err) callback(err);
        else {
            article_collection.find().toArray(function (err, result) {
                if(err) callback(err);
                else callback(null, result);
            });
        }
    });
};

ArtiCleProvider.prototype.findById = function (id, callback) {
    this.getCollection(function(err, article_collection) {
        if(err) callback(err);
        else {
            article_collection.findOne({_id:ObjectId.createFromHexString(id)},
            function(err, result){
                if(err) callback(err);
                else callback(null, result);
            });
        }
    });
};

ArtiCleProvider.prototype.save = function (articles, callback) {
    this.getCollection(function(err, article_collection) {
        if(err) callback(err);
        else {
            if (typeof(articles.length) == 'undefined') articles = [articles];
            for(i = 0; i < articles.length; i++){
                article = articles[i];
                article.create_at = new Date();
                article.comments = [];
            }
            article_collection.insert(articles, function () {
                callback(null, articles);
            });
        }
    });
};

ArtiCleProvider.prototype.addComment = function (id, comment, callback) {
    this.getCollection(function (err, article_collection) {
        if(err) callback(err);
        else {
            article_collection.update({_id:ObjectId.createFromHexString(id)},
                {'$push' : {comments:comment}},
            function (err, article) {
                if(err) callback(err);
                else callback(null, article);
            });
        }
    });
};

ArtiCleProvider.prototype.removeComment = function (id, comment, callback) {
    this.getCollection(function (err, article_collection) {
        if (err) callback(err);
        else {
            article_collection.update({_id:ObjectId.createFromHexString(id)},
                {'$pull':{comments:comment}},
            function (err, article) {
                if(err) callback(err);
                else callback(null, article);
            });
        }
    });
};

ArtiCleProvider.prototype.remove = function (id, callback) {
    this.getCollection(function (err, article_collection) {
        if (err) callback(err);
        else {
            article_collection.remove({_id:ObjectId.createFromHexString(id)},
            function (err, result) {
                if (err) callback(err);
                else callback(null, result);
            });
        }
    });
};

exports.ArticleProvider = ArtiCleProvider;

