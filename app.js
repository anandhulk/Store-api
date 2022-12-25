const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const productsRoute = require('./routes/products')
require('express-async-errors')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("hello")
})

app.use('/api/v1/products',productsRoute)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async()=>{
    try{
        await connectDB(process.env.LOCAL_URI);
        console.log("connect to MongoDB")
        app.listen(port,()=>console.log(`server running at ${port}.....`));
    }catch(err){
        console.log(err);
    }
}

start()