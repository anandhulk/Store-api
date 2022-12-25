const Product = require('../models/product')


const getAllProductsStatic = async(req,res)=>{
    res.json({msg:"all products static"})
}

const getAllProducts = async(req,res)=>{
    const {featured,company,name,rating,price} = req.query
    const reqObject = {}

    if(featured){
        reqObject.featured = featured === 'true'? true:false
    }

    if(company){
        reqObject.company = company
    }

    if(rating){
        reqObject.rating = { $gte : rating }
    }
    
    if(price){
        reqObject.price = { $lte : price }
    }

    if(name){
        reqObject.name = {$regex : name, $options : 'i'}
    }

    const products = await Product.find(reqObject)
    res.status(200).send({products,nbHits:products.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}