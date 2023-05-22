const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    "name":String,
    "price":String,
    "code":String,
    "description":String,
    "category":String,
})

const Producto = mongoose.model('productos', productosSchema);
 
module.exports = {
    Producto
}