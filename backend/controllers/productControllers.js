import product from"../models/product.js"

export const createProduct = async (req,res) =>{
    const product = await product.create({
        ...req.body,
        createdBy: req.user_id,
    })
}