const express = require('express');
const app = express();
const port = 8000;
require('./config/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views','./views')
app.use(express.static(__dirname + '/assets'));
app.use('/',require('./routes'));


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
