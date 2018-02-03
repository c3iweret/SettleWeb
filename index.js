'use strict';

var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname));


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: '3c468a6d-2d63-4fbf-92df-722453621327',
  password: 'z8p0KEHpeTR5',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

conversation.message(
  {
    input: { text: "What's the weather?" },
    workspace_id: 'a28add6d-4f47-4164-bfab-098f01d53f24'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);

// Main page.
app.get('/', function(req, res) {

	res.render('index', {
    title: 'Settle'
        });
})



//Routes

/*app.get('/applicants', ta.findAll);

app.post('/applicants', ta.addOne);

app.delete('/applicants', ta.delOne);

app.get('/courses', ta.findWithCourses);*/


// Start the server
app.listen(3000);
console.log('Listening on port 3000');
