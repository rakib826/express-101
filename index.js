const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const { json } = require('stream/consumers')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())
app.use(globalMiddleware)

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
  // console.log(req.get('Accept'))
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
  fs.readFile('./pages/about.html',(err,data)=>{
    if(err){
      console.log("Error from fs")
      res.send(`
        <h1>Something went wrong</h1>
        `)
    }else{
      res.write(data)
      res.end()
    }
  })
})

app.listen(5001,()=>{
  console.log("Server is listening on port 5001")
})

function globalMiddleware(req,res,next){
  console.log(`${req.method} - ${req.url}`)
  console.log("I am a global middleware")

  if(req.query.bad){
    return res.status(400).send("Bad Request")
  }

  next()
}