const express  = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const userRotes = require('./routes/userRoutes');
app.use('/api/users', userRotes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server started at => http://localhost:${PORT}`));