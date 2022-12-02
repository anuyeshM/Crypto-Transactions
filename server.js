const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Transaction = require('./route');
const mongoose = require('mongoose');
const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors());





// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Backend.' });
});

app.use('/api', Transaction);

// Not storeing mongo url as per interview purpose
const CONNECTION_URL = "mongodb+srv://anuyesh:Anuyesh123@cluster0.4ofh3we.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);

