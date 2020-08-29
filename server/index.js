const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors  = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const middleware = require('./middleware')
const log = require('./logEntry')
const logs = require('./api/log')
mongoose.connect("mongodb://localhost:27017/logDB",{useNewUrlParser:true,useUnifiedTopology:true});



const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors({
    origin:'http://localhost:3001'
}

));




app.use('/api/logs',logs)
app.get('/',(req,res)=>{
    res.json({message:'Hello world'})
})

app.use(middleware.notFound);
app.use(middleware.handler);



app.listen(3000,()=>{
    console.log("Server started");
})