const express = require('express')
const mongoose = require('mongoose')

const Product = require('./models/productModel')

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:false}));
mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://admin:CUSDlB3BRg23HepV@devtaminapi.mnx9chz.mongodb.net/test')
.then(()=> {
    app.listen(4444, ()=>{
        console.log('Node app is running')
    })
    console.log('connected to mongo DB')

}).catch((error) => {
    console.log('error')
})
app.get('/', (req,res)=>{
    res.send('Hello Node API')

})

app.post('/products',async(req,res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json()
    }
    
})
app.get('/blog',(req,res)=>{
    res.send('hello blog')
})


app.get('/products',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/product/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.put('/product/:id',async(req,res)=>{

    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(400).json({message: `cannot find any product with ID ${id}`})
        }
        const updateproduct = await Product.findById(id);

        res.status(200).json(updateproduct);

    } catch (error) {
                res.status(500).json({message: error.message});
    }
})

app.delete('/product/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `can not find any product with Id ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});

    }
})