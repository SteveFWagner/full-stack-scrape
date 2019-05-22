const express = require('express')
const ctrl = require('./puppetController')

const app = express()

app.use(express.json())

//endpoints
app.post('/api/puppet',ctrl.login)



app.listen(4040, ()=>{console.log('listening on port 4040')})