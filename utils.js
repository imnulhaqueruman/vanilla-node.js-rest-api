const fs = require('fs')

writeDataToFile = (filename, content) =>{
    fs.writeFileSync(filename,JSON.stringify(content),'utf-8', (err)=>{
        if(err){
            console.log(err)
        }
    })

}
getPostData = (req) =>{
    return new Promise((resolve,reject) =>{
        try{
            let body = ''
            req.on('data', (chunk) =>{
                body += chunk.toString()
            })
            req.on('end', () =>{
                resolve(body)
            })
        } catch(err){
           if(err)[
               reject(err)
           ]
        }
    })
}
module.exports={
    writeDataToFile,
    getPostData
}