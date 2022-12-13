const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));
app.use('/build/',express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/',express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

/*app.use('/hello',(req,res,next) => {
    console.log('in the middleware!');
    res.send('<h1>hellooooooooooooooo world!</h1>');
    next();
});*/
app.use('/sendapi',(req,res,next) => {
    console.log('API send vars!');
    res.send('<form action="/api" method="POST"><input type="text" name="title"><button type="submit">send</button></form>');
    //vres.redirect('/api?title=poo');
    });
app.use('/api',(req,res,next) => {
    console.log('in the API!');
    let choo;
    let koo;
    choo = JSON.stringify(req.body);
    koo = JSON.parse(choo);
    console.log(req.query);
    console.log(req.body, koo.title);    
    res.redirect('/?title='+koo.title);
    });
app.use('/',(req,res,next) => {
    console.log('in another middleware!');
    res.send('<h1>Go away!</h1>');
});


app.listen(3000);
console.log('end');