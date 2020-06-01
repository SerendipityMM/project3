const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const path = require('path');

require ('dotenv').config();
//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//Application
const app = express();

//Database
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true
       
}).then(() => console.log('Database Connected!'));


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


//Routes middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);

const port = process.env.PORT || 8000;


// adding info for heroku
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('ecommerce-front/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'ecommerce-front',  'build', 'index.html')); //relative path

    });
}

app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`);
});