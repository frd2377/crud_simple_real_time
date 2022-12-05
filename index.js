const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const {join} = require('path')
const {v4} = require('uuid')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(join(__dirname,'public')))

// let tareasGuardadas = []

app.get('/',(req,res)=>{
    res.render('index.html')
})

io.on('connection',(socket)=>{
    console.log('conection detected');
    socket.on('agregar-tarea',(data)=>{
        data['id'] = v4()
        io.emit('agregar-tarea',data)
    })
    socket.on('eliminar',(data)=>{
        io.emit('eliminar',data)
    })
    socket.on('modificar',(data)=>{
        io.emit('modificar',data)
    })
})

server.listen(process.env.PORT || 3000)







