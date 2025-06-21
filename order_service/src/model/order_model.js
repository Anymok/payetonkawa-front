const getAllOrders = "SELECT orders.id AS order_id, orders.date, orders.id_customer, "+
    "product.id AS product_id, product.name AS product_name, product.price, " +
    "product.description, product.stock, product.category, product.brand, product.rating, product.characteristic " +
    "FROM orders " +
    "LEFT JOIN order_product ON orders.id = order_product.id_order " +
    "LEFT JOIN product ON order_product.id_product = product.id "
const getOrderById = "SELECT orders.id AS order_id, orders.date, orders.id_customer, "+
    "product.id AS product_id, product.name AS product_name, product.price, " +
    "product.description, product.stock, product.category, product.brand, product.rating, product.characteristic " +
    "FROM orders " +
    "LEFT JOIN order_product ON orders.id = order_product.id_order " +
    "LEFT JOIN product ON order_product.id_product = product.id WHERE orders.id = $1"
const createOrder = "INSERT INTO orders (date, id_customer) VALUES ($1, $2) RETURNING *"
const associateOrderProduct = "INSERT INTO order_product (id_order, id_product) VALUES ($1, $2)"
const updateOrderById = "UPDATE orders SET date = $1 WHERE id = $2"
const deleteOrderProductById = "DELETE FROM order_product WHERE id_order = $1"
const deleteOrderById = "DELETE FROM orders WHERE id = $1"

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderProductById,
    deleteOrderById,
    associateOrderProduct
}
