const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is a required feild"]
    },
    price:{
        type:Number,
        required:[true,"price is a required fiels"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is important'
        }
    }
})


module.exports=mongoose.model('Product',productSchema)