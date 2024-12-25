const express = require('express')
const fs = require('fs')
const app = express()

app.get('/',(req,res)=>{
  // res.json({
  //   "id": "1",
  //   "message": "Hello User"
  // })
  // res.send(
  //   `
  //   <h1>Hello World</h1>
  //   <p>Javascript is Awesome</p>
  //   `
  // )
  fs.readFile('./pages/index.html',(err,data)=>{
    if(err){
      console.log("Error")
      res.send(`
        <h1>Something went wrong</h1>
        `)
    }else{
      res.write(data)
      res.end()
    }
  })
})
app.get('/about',(req,res)=>{
  res.send(`
    <h1>I am about route</h1>
    `)
})

app.listen(5001,()=>{
  console.log("Server is listening on port 5001")
})