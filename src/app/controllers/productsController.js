const products = require('../models/products');
const ServiceModel = require('../models/products');

const productsController = {

  create: async(req, res) => {
    try{
      req.code = req.code.replace('"', '')
      req.imported_t = new Date();

      const products = { req };

      await ServiceModel.create(products.req);
    } 
    catch (err) {
      console.log(err)
    }
  },

  get: async(req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    
    try{
      const product = await ServiceModel.find()
        .limit(pageSize * 1)
        .skip((page - 1) * pageSize)
        .exec();

      if(Object.keys(product).length == 0){
        return res.status(404).json({msg: "Produtos não encontrados" })
      }

      return res.status(200).json({ product , page, pageSize});
    } 
    catch (err) {
      return res.status(500).json(err);
    }
  },

  getById: async(req, res) => {
    try{
      const product = await ServiceModel.find({code: req.params.code});

      if(Object.keys(product).length == 0){
        return res.status(404).json({ msg: "Produto não encontrado" })
      }

      return res.status(200).json({ product });
    } 
    catch (err) {
      return res.status(500).json(err);
    }
  },

  put: async(req, res) => {
    try{
      const products = ( req.body );
      const filter = {code: req.params.code}

      const product = await ServiceModel.find({code: req.params.code});

      if(Object.keys(product).length == 0){
        return res.status(404).json({ msg: "Produto não encontrado" })
      }

      const alterProduct = await ServiceModel.findOneAndUpdate(filter, products, { new: true } )
      
      return res.status(200).json({ alterProduct, msg: "Produto alterado com sucesso" });
    } 
    catch (err) {
      return res.status(500).json(err);
    }
  },

  delete: async(req, res) => {
    try{
      const product = await ServiceModel.find({code: req.params.code});

      if(Object.keys(product).length == 0){
        return res.status(404).json({ msg: "Produto não encontrado" })
      }

      const deleteProduct = await ServiceModel.findOneAndUpdate({code: req.query.code, status: "trash"})

      return res.status(200).json({ deleteProduct, msg: "Produto excluído com sucesso" });
    } 
    catch (err) {
      return res.status(500).json(err);
    }
  },

  getByCode: async(req, res) => {
    try{
      const code = req.replace('"', '')
      const product = await ServiceModel.find({code: code});

      if(Object.keys(product).length == 0){
        return null
      }

      return product;
    } 
    catch (err) {
      console.log(err)
    }
  }

};

module.exports = productsController;