let products = require('../data/product.json')
const { v4: uuidv4} = require('uuid')

const {writeDataToFile} = require('../utils')


findAll = () =>{
    return new Promise((resolve,reject) =>{
         resolve(products)
    })
}
findById = (id) =>{
    return new Promise((resolve,reject) =>{
         const product = products.find((p) => p.id === id)
         resolve(product)
    })
}
create = (product) =>{
    return new Promise((resolve,reject) =>{
         const newProduct = {id: uuidv4(), ...product}
         products.push(newProduct)
         writeDataToFile('./data/product.json',products)
         resolve(newProduct)

    })
}
update = (id, product) =>{
    return new Promise((resolve,reject) =>{
        const index = products.findIndex((p) => p.id === id)
        products[index] ={id,...product}
         writeDataToFile('./data/product.json',products)
         resolve(products[index])

    })
}
remove = (id) =>{
    return new Promise((resolve,reject) =>{
        products = products.filter((p) => p.id !== id)
        writeDataToFile('./data/product.json',products)
        resolve()

    })
}
module.exports={
    findAll,
    findById,
    create,
    update,
    remove
}