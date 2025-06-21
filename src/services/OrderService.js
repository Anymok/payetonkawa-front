import privateAPI from "./config/privateConfig";

const getAllOrders = async () => {
	try {
		const response = await privateAPI.get("/order/");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error fetching products");
	}
};

const createOrder = async (order) => {
	try {
		const response = await privateAPI.post("/order/", order);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error creating product");
	}
};

const deleteOrder = async (idOrder) => {
	try {
		const response = await privateAPI.delete(`/order/${idOrder}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error deleting product");
	}
};

export { getAllOrders, createOrder, deleteOrder };
