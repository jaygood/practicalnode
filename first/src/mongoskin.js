const mongoskin = require('mongoskin');
const util = require('util');

const dbHost = '127.0.0.1';
const dbPort = '27017';
const db = mongoskin.db(`${dbHost}:${dbPort}/local`, {safe: true});

const messages = db.collection('messages');

const ifErrorExit = function(error) {
  if (error) {
    console.error('my error', error);
    process.exit(1);
  }
};

const exit = function(error, items) {
  db.close();
  process.exit(0);
};

db.bind('messages', {
  findOneAndAddText(text, fn) {
    db.collection('messages').findOne({}, (error, item) => {
      item.text = text;
      const id = item._id.toString();
      db.collection('messages').save(item, (error, count) => fn(count, id));
    });
  }
});

db.collection('messages').findOneAndAddText('ji', (count, id) => {
  db.collection('messages')
    .find({_id: messagse.id(id)})
    .toArray(exit);
});
