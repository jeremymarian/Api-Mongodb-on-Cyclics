const producto = require('../models/productosm');
const item = producto.Producto;

module.exports = {
  getAll: function(req, res, next) {
    item.find({}, (err, document) => {
      if (err) {
        console.error(err);
        res.status(500).send('error');
        return;
      }
      res.json(document);
      console.log(document);
    });
  },

  post: function(req, res, next) {
    const reqModel = new item(req.body);

    reqModel.save((err, saved) => {
      if (err) {
        console.error(err);
        res.status(500).send('error');
        return;
      }
      res.status(200).send('created');
      console.log(saved);
    });
  },

  getById: function(req, res, next) {
    item.findById(req.params.id, (err, document) => {
      if (err) {
        console.error(err);
        res.status(500).send('error');
        return;
      }
      if (!document) {
        res.status(404).send('not found');
        return;
      }
      res.json(document);
      console.log(document);
    });
  }
};