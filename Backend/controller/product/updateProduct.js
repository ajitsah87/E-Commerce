const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission Denied");
    }
    const {_id, ...resbody} = req.body
 const updateProduct = await productModel.findByIdAndUpdate(_id,resbody)
 res.json({
    message : "Product Update Successfully " ,
    data : updateProduct,
    success: true,
    error : false ,


 })
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController