> db.users.save({name:'Johnnu', languages:['ruby','c']});
WriteResult({ "nInserted" : 1 })
> db.users.save({name:'Sue', languages:['scala','list']});
WriteResult({ "nInserted" : 1 })
> db.users.find();
{ "_id" : ObjectId("58e594c07243a445e47be17c"), "name" : "Johnnu", "languages" : [ "ruby", "c" ] }
{ "_id" : ObjectId("58e594d47243a445e47be17d"), "name" : "Sue", "languages" : [ "scala", "list" ] }
> db.users.update({name:'Johnny'}, {name:'Cash',languages:['english']});
WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })
> db.users.update({name:'Johnnu'}, {name:'Cash',languages:['english']});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find();
{ "_id" : ObjectId("58e594c07243a445e47be17c"), "name" : "Cash", "languages" : [ "english" ] }
{ "_id" : ObjectId("58e594d47243a445e47be17d"), "name" : "Sue", "languages" : [ "scala", "list" ] }
> db.users.update({name:'Cash'}, {'$set':{'age':50}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find();
{ "_id" : ObjectId("58e594c07243a445e47be17c"), "name" : "Cash", "languages" : [ "english" ], "age" : 50 }
{ "_id" : ObjectId("58e594d47243a445e47be17d"), "name" : "Sue", "languages" : [ "scala", "list" ] }
> db.users.update({name:'Cash'}, {'$unset':{'age':50}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find();
{ "_id" : ObjectId("58e594c07243a445e47be17c"), "name" : "Cash", "languages" : [ "english" ] }
{ "_id" : ObjectId("58e594d47243a445e47be17d"), "name" : "Sue", "languages" : [ "scala", "list" ] }
> db.users.update({name:'Cash'}, {'$pull':{'languages':'scala'}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
> db.users.find();
{ "_id" : ObjectId("58e594c07243a445e47be17c"), "name" : "Cash", "languages" : [ "english" ] }
{ "_id" : ObjectId("58e594d47243a445e47be17d"), "name" : "Sue", "languages" : [ "scala", "list" ] }
> db.users.update({name:'Sue'}, {'$pull':{'languages':'scala'}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find();
{ "_id" : ObjectId("58e594c07243a445e47be17c"), "name" : "Cash", "languages" : [ "english" ] }
{ "_id" : ObjectId("58e594d47243a445e47be17d"), "name" : "Sue", "languages" : [ "list" ] }
> db.users.remove();
2017-04-06T10:19:51.217+0900 E QUERY    [thread1] Error: remove needs a query :
DBCollection.prototype._parseRemove@src/mongo/shell/collection.js:409:1
DBCollection.prototype.remove@src/mongo/shell/collection.js:434:18
@(shell):1:1
> db.users.remove({});
WriteResult({ "nRemoved" : 2 })
> db.users.remove({});
WriteResult({ "nRemoved" : 0 })
> db.users.find();
> db.users.find();
> db.users.save({name:'Sue', languages:['scala','list']});
WriteResult({ "nInserted" : 1 })
> db.users.find();
{ "_id" : ObjectId("58e597d77243a445e47be17e"), "name" : "Sue", "languages" : [ "scala", "list" ] }
> db.users.remove({});
WriteResult({ "nRemoved" : 1 })
> for(int i=1; i < 100, i++){
... db.users.save({name:'name'+i, pos:i});
... }
2017-04-06T10:23:32.696+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100, i++){ db.users.save({name:'name'+i, pos:i}); }
2017-04-06T10:23:53.552+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100;, i++;){ db.users.save({name:'name'+i, pos:i}); }
2017-04-06T10:24:11.420+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100;, i++){ db.users.save({name:'name'+i, pos:i}); }
2017-04-06T10:24:23.378+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100;, i++){ db.users.save({name:'name'+i, pos:i}); };
2017-04-06T10:24:27.235+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100;, i++){ db.users.save({name:'name'i, pos:i}); };
2017-04-06T10:24:50.940+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100;, i++){ db.users.save({name:'name'i, pos:i}); }
2017-04-06T10:25:28.917+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100; i++;){ db.users.save({name:'name'i, pos:i}); }
2017-04-06T10:25:48.380+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0, i < 100, i++;){ db.users.save({name:'name'i, pos:i}); }
2017-04-06T10:26:01.368+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100; i++){ db.users.save({name:"name"+i, pos:i}); }
2017-04-06T10:26:54.374+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(int i=0; i < 100; i++){ db.users.save({name:"name"+i, pos:i});}
2017-04-06T10:27:00.825+0900 E QUERY    [thread1] SyntaxError: missing ; after for-loop initializer @(shell):1:8
> for(i=0; i < 100; i++){ db.users.save({name:"name"+i, pos:i});}
WriteResult({ "nInserted" : 1 })
> db.users.find({})
{ "_id" : ObjectId("58e599827243a445e47be17f"), "name" : "name0", "pos" : 0 }
{ "_id" : ObjectId("58e599827243a445e47be180"), "name" : "name1", "pos" : 1 }
{ "_id" : ObjectId("58e599827243a445e47be181"), "name" : "name2", "pos" : 2 }
{ "_id" : ObjectId("58e599827243a445e47be182"), "name" : "name3", "pos" : 3 }
{ "_id" : ObjectId("58e599827243a445e47be183"), "name" : "name4", "pos" : 4 }
{ "_id" : ObjectId("58e599827243a445e47be184"), "name" : "name5", "pos" : 5 }
{ "_id" : ObjectId("58e599827243a445e47be185"), "name" : "name6", "pos" : 6 }
{ "_id" : ObjectId("58e599827243a445e47be186"), "name" : "name7", "pos" : 7 }
{ "_id" : ObjectId("58e599827243a445e47be187"), "name" : "name8", "pos" : 8 }
{ "_id" : ObjectId("58e599827243a445e47be188"), "name" : "name9", "pos" : 9 }
{ "_id" : ObjectId("58e599827243a445e47be189"), "name" : "name10", "pos" : 10 }
{ "_id" : ObjectId("58e599827243a445e47be18a"), "name" : "name11", "pos" : 11 }
{ "_id" : ObjectId("58e599827243a445e47be18b"), "name" : "name12", "pos" : 12 }
{ "_id" : ObjectId("58e599827243a445e47be18c"), "name" : "name13", "pos" : 13 }
{ "_id" : ObjectId("58e599827243a445e47be18d"), "name" : "name14", "pos" : 14 }
{ "_id" : ObjectId("58e599827243a445e47be18e"), "name" : "name15", "pos" : 15 }
{ "_id" : ObjectId("58e599827243a445e47be18f"), "name" : "name16", "pos" : 16 }
{ "_id" : ObjectId("58e599827243a445e47be190"), "name" : "name17", "pos" : 17 }
{ "_id" : ObjectId("58e599827243a445e47be191"), "name" : "name18", "pos" : 18 }
{ "_id" : ObjectId("58e599827243a445e47be192"), "name" : "name19", "pos" : 19 }
Type "it" for more
>
> it
{ "_id" : ObjectId("58e599827243a445e47be193"), "name" : "name20", "pos" : 20 }
{ "_id" : ObjectId("58e599827243a445e47be194"), "name" : "name21", "pos" : 21 }
{ "_id" : ObjectId("58e599827243a445e47be195"), "name" : "name22", "pos" : 22 }
{ "_id" : ObjectId("58e599827243a445e47be196"), "name" : "name23", "pos" : 23 }
{ "_id" : ObjectId("58e599827243a445e47be197"), "name" : "name24", "pos" : 24 }
{ "_id" : ObjectId("58e599827243a445e47be198"), "name" : "name25", "pos" : 25 }
{ "_id" : ObjectId("58e599827243a445e47be199"), "name" : "name26", "pos" : 26 }
{ "_id" : ObjectId("58e599827243a445e47be19a"), "name" : "name27", "pos" : 27 }
{ "_id" : ObjectId("58e599827243a445e47be19b"), "name" : "name28", "pos" : 28 }
{ "_id" : ObjectId("58e599827243a445e47be19c"), "name" : "name29", "pos" : 29 }
{ "_id" : ObjectId("58e599827243a445e47be19d"), "name" : "name30", "pos" : 30 }
{ "_id" : ObjectId("58e599827243a445e47be19e"), "name" : "name31", "pos" : 31 }
{ "_id" : ObjectId("58e599827243a445e47be19f"), "name" : "name32", "pos" : 32 }
{ "_id" : ObjectId("58e599827243a445e47be1a0"), "name" : "name33", "pos" : 33 }
{ "_id" : ObjectId("58e599827243a445e47be1a1"), "name" : "name34", "pos" : 34 }
{ "_id" : ObjectId("58e599827243a445e47be1a2"), "name" : "name35", "pos" : 35 }
{ "_id" : ObjectId("58e599827243a445e47be1a3"), "name" : "name36", "pos" : 36 }
{ "_id" : ObjectId("58e599827243a445e47be1a4"), "name" : "name37", "pos" : 37 }
{ "_id" : ObjectId("58e599827243a445e47be1a5"), "name" : "name38", "pos" : 38 }
{ "_id" : ObjectId("58e599827243a445e47be1a6"), "name" : "name39", "pos" : 39 }
Type "it" for more
> it
{ "_id" : ObjectId("58e599827243a445e47be1a7"), "name" : "name40", "pos" : 40 }
{ "_id" : ObjectId("58e599827243a445e47be1a8"), "name" : "name41", "pos" : 41 }
{ "_id" : ObjectId("58e599827243a445e47be1a9"), "name" : "name42", "pos" : 42 }
{ "_id" : ObjectId("58e599827243a445e47be1aa"), "name" : "name43", "pos" : 43 }
{ "_id" : ObjectId("58e599827243a445e47be1ab"), "name" : "name44", "pos" : 44 }
{ "_id" : ObjectId("58e599827243a445e47be1ac"), "name" : "name45", "pos" : 45 }
{ "_id" : ObjectId("58e599827243a445e47be1ad"), "name" : "name46", "pos" : 46 }
{ "_id" : ObjectId("58e599827243a445e47be1ae"), "name" : "name47", "pos" : 47 }
{ "_id" : ObjectId("58e599827243a445e47be1af"), "name" : "name48", "pos" : 48 }
{ "_id" : ObjectId("58e599827243a445e47be1b0"), "name" : "name49", "pos" : 49 }
{ "_id" : ObjectId("58e599827243a445e47be1b1"), "name" : "name50", "pos" : 50 }
{ "_id" : ObjectId("58e599827243a445e47be1b2"), "name" : "name51", "pos" : 51 }
{ "_id" : ObjectId("58e599827243a445e47be1b3"), "name" : "name52", "pos" : 52 }
{ "_id" : ObjectId("58e599827243a445e47be1b4"), "name" : "name53", "pos" : 53 }
{ "_id" : ObjectId("58e599827243a445e47be1b5"), "name" : "name54", "pos" : 54 }
{ "_id" : ObjectId("58e599827243a445e47be1b6"), "name" : "name55", "pos" : 55 }
{ "_id" : ObjectId("58e599827243a445e47be1b7"), "name" : "name56", "pos" : 56 }
{ "_id" : ObjectId("58e599827243a445e47be1b8"), "name" : "name57", "pos" : 57 }
{ "_id" : ObjectId("58e599827243a445e47be1b9"), "name" : "name58", "pos" : 58 }
{ "_id" : ObjectId("58e599827243a445e47be1ba"), "name" : "name59", "pos" : 59 }
Type "it" for more
> it
{ "_id" : ObjectId("58e599827243a445e47be1bb"), "name" : "name60", "pos" : 60 }
{ "_id" : ObjectId("58e599827243a445e47be1bc"), "name" : "name61", "pos" : 61 }
{ "_id" : ObjectId("58e599827243a445e47be1bd"), "name" : "name62", "pos" : 62 }
{ "_id" : ObjectId("58e599827243a445e47be1be"), "name" : "name63", "pos" : 63 }
{ "_id" : ObjectId("58e599827243a445e47be1bf"), "name" : "name64", "pos" : 64 }
{ "_id" : ObjectId("58e599827243a445e47be1c0"), "name" : "name65", "pos" : 65 }
{ "_id" : ObjectId("58e599827243a445e47be1c1"), "name" : "name66", "pos" : 66 }
{ "_id" : ObjectId("58e599827243a445e47be1c2"), "name" : "name67", "pos" : 67 }
{ "_id" : ObjectId("58e599827243a445e47be1c3"), "name" : "name68", "pos" : 68 }
{ "_id" : ObjectId("58e599827243a445e47be1c4"), "name" : "name69", "pos" : 69 }
{ "_id" : ObjectId("58e599827243a445e47be1c5"), "name" : "name70", "pos" : 70 }
{ "_id" : ObjectId("58e599827243a445e47be1c6"), "name" : "name71", "pos" : 71 }
{ "_id" : ObjectId("58e599827243a445e47be1c7"), "name" : "name72", "pos" : 72 }
{ "_id" : ObjectId("58e599827243a445e47be1c8"), "name" : "name73", "pos" : 73 }
{ "_id" : ObjectId("58e599827243a445e47be1c9"), "name" : "name74", "pos" : 74 }
{ "_id" : ObjectId("58e599827243a445e47be1ca"), "name" : "name75", "pos" : 75 }
{ "_id" : ObjectId("58e599827243a445e47be1cb"), "name" : "name76", "pos" : 76 }
{ "_id" : ObjectId("58e599827243a445e47be1cc"), "name" : "name77", "pos" : 77 }
{ "_id" : ObjectId("58e599827243a445e47be1cd"), "name" : "name78", "pos" : 78 }
{ "_id" : ObjectId("58e599827243a445e47be1ce"), "name" : "name79", "pos" : 79 }
Type "it" for more
> it
{ "_id" : ObjectId("58e599827243a445e47be1cf"), "name" : "name80", "pos" : 80 }
{ "_id" : ObjectId("58e599827243a445e47be1d0"), "name" : "name81", "pos" : 81 }
{ "_id" : ObjectId("58e599827243a445e47be1d1"), "name" : "name82", "pos" : 82 }
{ "_id" : ObjectId("58e599827243a445e47be1d2"), "name" : "name83", "pos" : 83 }
{ "_id" : ObjectId("58e599827243a445e47be1d3"), "name" : "name84", "pos" : 84 }
{ "_id" : ObjectId("58e599827243a445e47be1d4"), "name" : "name85", "pos" : 85 }
{ "_id" : ObjectId("58e599827243a445e47be1d5"), "name" : "name86", "pos" : 86 }
{ "_id" : ObjectId("58e599827243a445e47be1d6"), "name" : "name87", "pos" : 87 }
{ "_id" : ObjectId("58e599827243a445e47be1d7"), "name" : "name88", "pos" : 88 }
{ "_id" : ObjectId("58e599827243a445e47be1d8"), "name" : "name89", "pos" : 89 }
{ "_id" : ObjectId("58e599827243a445e47be1d9"), "name" : "name90", "pos" : 90 }
{ "_id" : ObjectId("58e599827243a445e47be1da"), "name" : "name91", "pos" : 91 }
{ "_id" : ObjectId("58e599827243a445e47be1db"), "name" : "name92", "pos" : 92 }
{ "_id" : ObjectId("58e599827243a445e47be1dc"), "name" : "name93", "pos" : 93 }
{ "_id" : ObjectId("58e599827243a445e47be1dd"), "name" : "name94", "pos" : 94 }
{ "_id" : ObjectId("58e599827243a445e47be1de"), "name" : "name95", "pos" : 95 }
{ "_id" : ObjectId("58e599827243a445e47be1df"), "name" : "name96", "pos" : 96 }
{ "_id" : ObjectId("58e599827243a445e47be1e0"), "name" : "name97", "pos" : 97 }
{ "_id" : ObjectId("58e599827243a445e47be1e1"), "name" : "name98", "pos" : 98 }
{ "_id" : ObjectId("58e599827243a445e47be1e2"), "name" : "name99", "pos" : 99 }
> it
no cursor
> db.users.find({'$or':[{'pos':{'$gte':6,'$lte':27}},{'pos':{'$gt':77,'$lte':90}}]},{'pos':0});
{ "_id" : ObjectId("58e599827243a445e47be185"), "name" : "name6" }
{ "_id" : ObjectId("58e599827243a445e47be186"), "name" : "name7" }
{ "_id" : ObjectId("58e599827243a445e47be187"), "name" : "name8" }
{ "_id" : ObjectId("58e599827243a445e47be188"), "name" : "name9" }
{ "_id" : ObjectId("58e599827243a445e47be189"), "name" : "name10" }
{ "_id" : ObjectId("58e599827243a445e47be18a"), "name" : "name11" }
{ "_id" : ObjectId("58e599827243a445e47be18b"), "name" : "name12" }
{ "_id" : ObjectId("58e599827243a445e47be18c"), "name" : "name13" }
{ "_id" : ObjectId("58e599827243a445e47be18d"), "name" : "name14" }
{ "_id" : ObjectId("58e599827243a445e47be18e"), "name" : "name15" }
{ "_id" : ObjectId("58e599827243a445e47be18f"), "name" : "name16" }
{ "_id" : ObjectId("58e599827243a445e47be190"), "name" : "name17" }
{ "_id" : ObjectId("58e599827243a445e47be191"), "name" : "name18" }
{ "_id" : ObjectId("58e599827243a445e47be192"), "name" : "name19" }
{ "_id" : ObjectId("58e599827243a445e47be193"), "name" : "name20" }
{ "_id" : ObjectId("58e599827243a445e47be194"), "name" : "name21" }
{ "_id" : ObjectId("58e599827243a445e47be195"), "name" : "name22" }
{ "_id" : ObjectId("58e599827243a445e47be196"), "name" : "name23" }
{ "_id" : ObjectId("58e599827243a445e47be197"), "name" : "name24" }
{ "_id" : ObjectId("58e599827243a445e47be198"), "name" : "name25" }
Type "it" for more
> it
{ "_id" : ObjectId("58e599827243a445e47be199"), "name" : "name26" }
{ "_id" : ObjectId("58e599827243a445e47be19a"), "name" : "name27" }
{ "_id" : ObjectId("58e599827243a445e47be1cd"), "name" : "name78" }
{ "_id" : ObjectId("58e599827243a445e47be1ce"), "name" : "name79" }
{ "_id" : ObjectId("58e599827243a445e47be1cf"), "name" : "name80" }
{ "_id" : ObjectId("58e599827243a445e47be1d0"), "name" : "name81" }
{ "_id" : ObjectId("58e599827243a445e47be1d1"), "name" : "name82" }
{ "_id" : ObjectId("58e599827243a445e47be1d2"), "name" : "name83" }
{ "_id" : ObjectId("58e599827243a445e47be1d3"), "name" : "name84" }
{ "_id" : ObjectId("58e599827243a445e47be1d4"), "name" : "name85" }
{ "_id" : ObjectId("58e599827243a445e47be1d5"), "name" : "name86" }
{ "_id" : ObjectId("58e599827243a445e47be1d6"), "name" : "name87" }
{ "_id" : ObjectId("58e599827243a445e47be1d7"), "name" : "name88" }
{ "_id" : ObjectId("58e599827243a445e47be1d8"), "name" : "name89" }
{ "_id" : ObjectId("58e599827243a445e47be1d9"), "name" : "name90" }
> it
no cursor
