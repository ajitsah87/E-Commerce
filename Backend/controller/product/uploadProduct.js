const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

async function UploadProductController(req,res){
    try {
        const  sessionUserId = req.userId
        if (!uploadProductPermission(sessionUserId)) {
            
throw new Error("Permission Denied")

        }
        const uploadProduct = new productModel(req.body) 
        const saveProduct = await uploadProduct.save()
        res.status(201).json({
            message: "product Upload Successfully",
            error : false,
            success : true ,
            data : saveProduct
        })
    }  catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}
module.exports = UploadProductController