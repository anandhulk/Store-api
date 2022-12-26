const Product = require('../models/product')


const getAllProductsStatic = async(req,res)=>{
    res.json({msg:"all products static"})
}

const getAllProducts = async(req,res)=>{
    const {featured,company,name,rating,price,sort,fields} = req.query
    const reqObject = {}

    if(featured){
        reqObject.featured = featured === 'true'? true:false
    }

    if(company){
        reqObject.company = company
    }

    if(rating){
        reqObject.rating = { $gte : Number(rating) }
    }
    
    if(price){
        reqObject.price = { $lte : Number(price) }
    }

    if(name){
        reqObject.name = {$regex : name, $options : 'i'}
    }

    let result = Product.find(reqObject)

    if(sort){
        let sortList=sort.split(',').join(' ')
        result=result.sort(sortList)
    }
    else{
        result=result.sort('createdAt')
    }
    
    if(fields){
        let fieldList = fields.split(',').join(' ')
        result=result.select(fieldList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1)*limit

    const products = await result.skip(skip).limit(limit)

    res.status(200).send({products,nbHits:products.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}