import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
// Routes

const app = express();

// Middle Wares
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

dotenv.config();
const URI = process.env.MONGO_DB;
mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology : true,
    }
    ).then(()=>app.listen(process.env.PORT,()=>console.log("listening... at port 5000")))
    .catch((error)=> console.log(error));


app.get("/",(req,res)=>{
    res.status(200).send("hello yogesh");
})


// Usage of Routes


app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/post',PostRoute);