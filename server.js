const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    res.send('Hello Node API')

})
app.listen(4444, ()=>{
    console.log('Node app is running')
})