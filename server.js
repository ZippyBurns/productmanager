// Require the Express Module
const express = require('express');
// Create an Express App
const app = express();
//Require Mongoose 
const mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
const bodyParser = require('body-parser');
// Require path
const path = require('path');
// Integrate body-parser with our App
app.use(bodyParser.json());
useNewUrlParser: true
// // Setting our Static Folder Directory
app.use(express.static(__dirname + '/public/dist/public'));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Use native promises (only necessary with mongoose versions <= 4)
mongoose.Promise = global.Promise;

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/product_manager');
const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "title must have at least 3 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        minlength: [3, "You must enter a valid price: '0.00'"]

    },
    imgUrl: {
        type: String
    }
}, { timestamps: true })

mongoose.model('Product', ProductSchema);
const Product = mongoose.model('Product')

// Routes
// Root Request

//get ALL
app.get('/products', (req, res) => {
    let allProducts = Product.find({}, function (err, data) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success", 'allProducts': data });
        }
    })
})
//Retrieve
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.findOne({ _id: id }, function (err, product) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success", product: product });
        }
    })
})
// Create 
app.post('/products', (req, res) => {
    console.log(req.body);
    const product = new Product({ title: req.body.title, price: req.body.price, imgUrl: req.body.imgUrl });
    product.save(function (err) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success" });
        }
    })
})
//update
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    var error = { title: "", price: "" }
    if (req.body.title.length < 4) {
        error.title = "You must provide a title with at least 4 characters.";
    }
    if (req.body.price.length < 1) {
        error.price = "You must provide a price."
    }
    if (error.title || error.price) {
        res.json({ message: "error", error: error })
 
    } else {
        Product.findOneAndUpdate({ _id: id }, { title: req.body.title, price: req.body.price, imgUrl: req.body.imgUrl }, function (err, product) {

            if (err) {
                res.json({ message: "error", error: err });
            } else {
                res.json({ message: "success", product: product });
            }
        })
    }
})

//delete
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.remove({ _id: id }, function (err) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success" });
        }
    })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
