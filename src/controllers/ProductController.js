const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query; // Recebe o query param page, default = 1 
    const products = await Product.paginate(
      {}, // Utilizado para realizar filtros 
      { page , limite: 10 },
    );

    if (products) {
      return res.json(products);
    } else {
      return res.sendStatus(404); //Nao encontrado o documento
    }

  },

  async show(req, res) {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      return res.sendStatus(404); //Nao encontrado o documento
    }
    
  },

  async store(req, res) {
    const product = await Product.create(req.body);
  
    return res.json(product); 
  },

  async update(req, res) {
    const product = await Product.findByIdAndUpdate(
      req.params.id, // Recebe a id do registro que será atualizado
      req.body,      // Recebe no body apenas o conteúdo que será atualizado
      { new: true }, // Retorna p/ product os valores do objeto após atualizado
      );

      if (product) {
        return res.json(product);
      } else {
        return res.sendStatus(404); //Nao encontrado o documento
      } 
  },

  async destroy(req, res) {
    const Excluido = await Product.findByIdAndDelete(req.params.id);
 
    if (Excluido) {
      return res.sendStatus(204); //Sucesso, porém sem retorno
    } else {
      return res.sendStatus(404); //Nao encontrado o documento
    } 
  },
};