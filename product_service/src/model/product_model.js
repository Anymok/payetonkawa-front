const getAllProduct = "SELECT * FROM product"
const getProduct = "SELECT * FROM product WHERE id= $1"
const createProduct = "INSERT INTO product (name, price, description, stock, category, brand, rating, characteristic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
const updateProduct = "UPDATE product SET name = $1, price = $2, description = $3, stock = $4, category = $5, brand = $6, rating = $7, characteristic = $8 WHERE id = $9"
const deleteProduct = "DELETE FROM product WHERE id = $1"

module.exports = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}