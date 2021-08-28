const Product = require('../models/productModels')

const {getPostData} = require('../utils')
// Get Products 
// route /api/products
getProducts = async (req,res)  =>{
    try{

        const products = await Product.findAll()

        res.writeHead(200, {'Content-Type':'application/json'})
        res.end(JSON.stringify(products))
    }
    catch (error){
      console.log(error)
    }
}

// Get Product
// route /api/products/id 
getProduct = async (req,res,id)  =>{
    try{

        const product = await Product.findById(id)
        if(!product){

            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        }
        else{
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(JSON.stringify(product))
        }

    }
    catch (error){
      console.log(error)
    }
}
// create Product
// post request 
// route /api/products/id 
createProduct = async (req,res)  =>{
    try{
       const body = await getPostData(req)
            const {title, description, price} = JSON.parse(body)
            const product={
                title,
                description,
                price
            }
            const newProduct = await Product.create(product)
        
            res.writeHead(201,{'Content-Type':'application/json'})
            return res.end(JSON.stringify(newProduct))
        
        

    }
    catch (error){
      console.log(error)
    }
}
// update Product
// put request 
// route /api/products/:id 
updateProduct = async (req,res,id)  =>{
    try{
        const product = await Product.findById(id)
        if(!product){
            
            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        }
        else{
            const body = await getPostData(req)
            const {title, description, price} = JSON.parse(body)
            const productData={
                title:title || product.title,
                description:description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(id,productData)
        
            res.writeHead(200,{'Content-Type':'application/json'})
            return res.end(JSON.stringify(updProduct))
        }
       
        
        

    }
    catch (error){
      console.log(error)
    }
}
// delete product 
// delete request
removeProduct = async (req,res,id)  =>{
    try{

        const product = await Product.findById(id)
        if(!product){

            res.writeHead(404, {'Content-Type':'application/json'})
            res.end(JSON.stringify({message: 'Product not found'}))
        }
        else{
            await Product.remove(id)
            res.writeHead(200, {'Content-Type':'application/json'})
            res.end(JSON.stringify({ message:`Product ${id} removed`}))
        }

    }
    catch (error){
      console.log(error)
    }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
}