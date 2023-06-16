const express = require('express')
const cors = require('cors')
const PORT = 5000
const app = express()

// middleware
app.use(cors())
app.use(express())

app.listen(PORT, () => {
  console.log('Server started on port 5000')
})
