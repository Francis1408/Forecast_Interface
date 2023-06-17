import path from 'path';

import express from 'express';
import hbs from 'hbs';


const app = express();
const __dirname = new URL('.', import.meta.url).pathname

// routers
import index from './routes/index.js';

// configuring views and hbs engine
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs');

// configuring static elements
app.use(express.static(path.join(__dirname, 'public')));

// configuring route
app.use('/', index);

// error 404 exception
app.use( (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// print a stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
    });
});


app.set('port', process.env.PORT || 3000);

let server = app.listen(3000, () =>{
    console.log('Express server listening on port ' + server.address().port);
});

export default app