const userRoutes = require('./routers/userRoutes');
const productRoutes = require('./routers/productRoutes');
const cartRoutes = require('./routers/cartRoutes');
const orderRoutes = require('./routers/orderRoutes');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();

const app = express();

app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(`${ req.url } ${ req.method }`);
    next();
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

app.listen(PORT, () => {
    console.log(`app listening on port ${ PORT }`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+ '/public/index.html'));
});

mongoose.connect(uri, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connection Successful'))
.catch((e) => console.error(new Error(`MongoDB Connection Error: ${ e.message }`)));