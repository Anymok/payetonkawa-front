const getStockProduct = "SELECT * FROM inventory WHERE id_product= $1"
const createStock = "INSERT INTO inventory (id_product, quantity) VALUES ($1, $2)"
const updateStockProduct = "UPDATE inventory SET quantity = $1 WHERE id_product = $2"
const deleteStockProduct = "DELETE FROM inventory WHERE id_product = $1"

module.exports = {
    getStockProduct,
    createStock,
    updateStockProduct,
    deleteStockProduct
}