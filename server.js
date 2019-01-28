let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let apiRouter = require('./app/routes/apiRoutes');
let htmlRouter = require('./app/routes/htmlRoutes');
let exphbs = require('express-handlebars');
let path = require('path');

let port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, '/app/public'));
app.engine('handlebars', exphbs({layoutsDir: path.join(__dirname, '/app/public')}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);
app.use('/', htmlRouter);
app.use('*', htmlRouter);


app.listen(port, () => console.log(`Listenting on port ${port}`));