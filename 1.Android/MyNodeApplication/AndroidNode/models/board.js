//스키마 작성하기

const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/mongodb_tutorial");

autoIncrement.initialize(connection);

let boardSchema = new Schema({
  title: String,
  writer: String,
  contents:String
}, {
   versionKey: false
});

boardSchema.plugin(autoIncrement.plugin, 'Board');
var board = connection.model('board', boardSchema);

module.exports = board;
