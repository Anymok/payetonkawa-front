const getAllCustomers = "SELECT * FROM customers"
const getCustomerById = "SELECT * FROM customers where customers.id = $1"
const getCustomerOrdersList = "SELECT * FROM orders INNER JOIN customers ON orders.id_customer = customers.id WHERE customers.id = $1"
const createCustomer = "INSERT INTO customers (id, name, email, password) VALUES ($1, $2, $3, '5454')"

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerOrdersList,
    createCustomer
}