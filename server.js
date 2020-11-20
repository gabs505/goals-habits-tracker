const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')
const config = require('config')
const path=require('path')


require('dotenv').config();

const app=express();
const port= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri=config.get('mongoURI')
mongoose.connect(uri, { useNewUrlParser:true, useCreateIndex:true});
const connection=mongoose.connection;

connection.once('open', ()=>{
    console.log('MongoDB Database connection estabilished successfully')
})

const goalsRouter=require('./routes/goals')
const usersRouter=require('./routes/users')

app.use('/goals', goalsRouter);
app.use('/users', usersRouter);
app.use('/auth', require('./routes/auth')
);

//Serve static assests if in production
if(process.env.NODE_ENV==='production'){
    //Set static folder
    app.use(express.static("client/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
     })
}

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})


//"heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"