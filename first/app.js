const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');

app.all('*', (req, res) => res.render('index', {msg: 'Sup'}));

http.createServer(app).listen(app.get('port'), () => {
  console.log('port', app.get('port'));
});