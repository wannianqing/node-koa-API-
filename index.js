const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const InitManager = require('./core/init');
const catcheError = require('./middlewares/catcheError');

const app = new Koa();

app.use(bodyParser());
app.use(catcheError);

InitManager.init(app);



app.listen(3001)