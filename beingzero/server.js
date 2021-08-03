const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const dbconnect = require('./backend/db/connect');
const logger = require('./backend/lib/logLib').getLogger();

dbconnect.connect(false);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
	logger.info(`Example app listening at http://localhost:${port}`)
})