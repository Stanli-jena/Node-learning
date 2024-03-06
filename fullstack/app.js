let express = require('express');
let app =express();
let dotenv= require('dotenv');
dotenv.config()
let morgan = require('morgan');
let fs = require('fs');
let port = process.env.PORT || 6700;

let menu = [
    {name:'category',link:'/category'},
    {name:'products',link:'/products'}
]

let categoryRouter = require('./src/controller/categoryRouter')(menu);
let productRouter = require('./src/controller/productRouter')(menu);


//middleware
app.use(morgan('common',{stream:fs.createWriteStream('./app.log')}))

//static file path
app.use(express.static(__dirname+'/public'))
//html file path
app.set('views','./src/views')
//view engine
app.set('view engine','ejs')

//default
app.get('/',(req,res)=>{
    //res.send('Hii from express')
    res.render('index',{title:'Home page',menu})
})

app.use('/category',categoryRouter);
app.use('/products',productRouter);

app.listen(port,(err)=>{
    if(err) throw err;
    else{
        console.log(`server is running on port ${port}`)
    }
})