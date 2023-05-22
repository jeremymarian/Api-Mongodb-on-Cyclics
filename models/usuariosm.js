const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const usuariosSchema = new mongoose.Schema({
    name:String,
    lastname:String,
    email:String,
    password:String
})

usuariosSchema.pre("save", function(next) {
this.password = bcrypt.hashSync(this.password, 10)
next()
})

const Usuario = mongoose.model('usuarios', usuariosSchema);
 
module.exports = {
   Usuario
}