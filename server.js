const express = require('express')

const app = express()



app.get('/api/data', function(req, res) {
  console.log(req.data)
  res.status(200).send("Good job!")
})

app.listen(3001, () => {
  console.log("Listening on port 3001")
})