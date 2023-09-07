import productModel from '../models/products.model.js';

export default class ProductDAO {
  getAll = async () => await productModel.find();
  getAllPaginate = async (filter, options) => await productModel.paginate(filter, options);

  getById = async (id) => await productModel.findById(id).lean().exec();
  create = async (data) => await productModel.create(data);
  // actualiza el producto y devuelve con los datos anterios si no ponemos el returnDocument
  update = async (id, data) => await productModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  delete = async (id) => await productModel.findByIdAndDelete(id);
}
