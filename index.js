const express = require('express');
const app = express();
const port = 4000;

var date = new Date();
var day = date.getDay();
var hours = date.getHours();
var minutes = date.getMinutes();

app.set('views','./views')
app.set('view engine', 'pug')

const myLoggerDay = (req,res,next) => {
    if(day< 1 || day>5){
    res.send('This web application is only available in working time (Monday to Friday,  from 9 to 17)')}
    else next();
}

const myLoggerHour = (req,res,next) => {
    if((hours<9 || hours>17) || (hours===17 && minutes!==0)){
    res.send('This web application is only available in working time (Monday to Friday,  from 9 to 17)')  
    } 
    else next();
}

app.get('/',myLoggerDay,myLoggerHour,(req,res) => {
    res.render('home')
})

app.get('/Services',myLoggerDay,myLoggerHour,(req,res) => {
    res.render('Services')
})

app.get('/Contact',myLoggerDay,myLoggerHour,(req,res) => {
    res.render('Contact')
})

app.listen(port, () => {
    console.log(`The server is running , Please open your browser at http://localhost:${port}`)
})