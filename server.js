const http = require('http')

const {getProducts,getProduct,createProduct,updateProduct,removeProduct} = require('./controllers/productControllers')


const server = http.createServer((req,res) =>{
    if(req.url === '/api/products' && req.method.toLocaleLowerCase() === 'get'){
        getProducts(req,res)
    }
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method.toLocaleLowerCase() === 'get') {
         const id = req.url.split('/')[3]
         getProduct(req,res,id)
    } 
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method.toLocaleLowerCase() === 'put') {
        const id = req.url.split('/')[3]
        updateProduct(req,res,id)
   }
   else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method.toLocaleLowerCase() === 'delete') {
    const id = req.url.split('/')[3]
    removeProduct(req,res,id)
}
    else if(req.url === '/api/products' && req.method.toLocaleLowerCase() === 'post'){
        createProduct(req,res)
    }
    else{
        res.writeHead(404, {'Content-Type':'application/json'})
        res.end(JSON.stringify({message: ' Route Not found'}))
    }

 

})

const port = process.env.PORT || 5000 

server.listen(port, () => console.log(`Server running on port ${port}`))