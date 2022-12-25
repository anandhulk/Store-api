const connectDB = require('./db/connect')
const Product = require('./models/product')
const ProductsData = require('./products.json')
require('dotenv').config()

const start = async()=>{
    try {
        await connectDB(process.env.LOCAL_URI)
        console.log('Success')
        await Product.deleteMany({})
        await Product.create(ProductsData)
        console.log('populated')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()