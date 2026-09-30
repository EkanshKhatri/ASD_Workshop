const express = require("express")
const app = express()
const fs = require("fs").promises
const path = require("path")
const filePath = path.join(__dirname,"db.json")
const cache = {}


async function readFile(){
    try{
        let data = await fs.readFile(filePath,"utf-8")
        return JSON.parse(data)
    }catch(err){
        console.log(err)
    }
}

async function readFileWithDelay(){
    try{
        await new Promise((resolve, reject)=>{(setTimeout(resolve, 1500))})
        let data = await readFile()
        return data
    }catch(err){
        console.log(err)
    }
   
}

app.get("/products",async (req,res)=>{
    let key = req.url
    let value = cache[key]
    if(value){
        res.set("X-Cache", "HIT")
        return res.json(value)
    }


    let products = await readFileWithDelay()
    cache[key] = products
    res.set("X-Cache", "MISS")
    return res.json(products)
})
app.get("/products/:id",async (req,res)=>{
    try{
        let id = Number(req.params.id)
        let products = await readFileWithDelay()
        let product = products.find((item)=>{
            return item.id===id
        })
        res.json(product)
    }catch(err){
        res.status(500).send("Server Error")
    }
})


app.listen(3000,()=>{
    console.log("Server is Running on port 3000")
})
