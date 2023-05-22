const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuariosm').Usuario;

module.exports = {
  getAll: function(req, res, next) {
    Usuario.find({}, (err, document) => {
      if (err) {
        console.error(err);
        res.status(500).send('error');
      } else {
        res.json(document);
        console.log(document);
      }
    });
  },


  signedVerify: async function(req, res, next) {
    try {
      const user = await Usuario.findOne({ email: req.body.email });
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user._id }, req.app.get('security'), { expiresIn: '1h' });
        res.json(token);
      } else {
        console.error({ message: "email y/o contraseña incorrectos" });
        res.status(500).json({ message: 'email y/o contraseña incorrectos' });
      }
    } catch (err) {
      next(err);
    }
  },
  

  post: function(req, res) {
    const newUser = new Usuario(req.body);
    newUser.save((err, saved) => {
      if (err) {
        console.error(err);
        res.status(500).send('error');
      } else {
        res.status(200).json({message: 'usuario creado con exito'});
        console.log(saved);
      }
    });
  },

  getById: function(req, res, next) {
    Usuario.findById(req.params.id, (err, document) => {
      if (err) {
        console.error(err);
        res.status(500).send('error');
      } else if (!document) {
        res.status(404).send('not found');
      } else {
        res.json(document);
        console.log(document);
      }
    });
  },
};
