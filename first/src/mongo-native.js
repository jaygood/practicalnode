const mongo = require('mongodb');

const ifErrorExit = function(error) {
  if (error) {
    console.error('my error', error);
    process.exit(1);
  }
};

const dbHost = '127.0.0.1';
const dbPort = '27017';
const db = new mongo.Db('local', new mongo.Server(dbHost, dbPort), {safe: true});

const findToArray = function(error, items) {
  console.info('find', items);
  db.close();
  process.exit(0);
};
const save = function(id, error, item) {
  ifErrorExit(error);
  console.info('save', item);
  this
    .find({_id: new mongo.ObjectID(id)})
    .toArray(findToArray);
};
const findOne = function(error, item) {
  ifErrorExit(error);
  console.info('findOne:', item);
  const id = item._id.toString();
  item.text = 'hellodddddd';
  this.save(item, save.bind(this, id));
};

db.open((error, dbConnection) => {

  ifErrorExit(error);
  console.log('db state:', db._state);
  const collection = dbConnection.collection('messages');
  collection.findOne({}, findOne.bind(collection));
});
