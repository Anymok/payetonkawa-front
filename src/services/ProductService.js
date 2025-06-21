import privateAPI from "./config/privateConfig";

const getAllProducts = async () => {
	try {
		const response = await privateAPI.get("/product/");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error fetching products");
	}
};

const getProduct = async (idProduct) => {
	try {
		const response = await privateAPI.get(`/product/${idProduct}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error fetching product");
	}
};

const createProduct = async (product) => {
	try {
		const response = await privateAPI.post("/product/", product);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error creating product");
	}
};

const updateProduct = async (idProduct, product) => {
	try {
		const response = await privateAPI.put(`/product/${idProduct}`, product);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error updating product");
	}
};

const deleteProduct = async (idProduct) => {
	try {
		const response = await privateAPI.delete(`/product/${idProduct}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error deleting product");
	}
};

export {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
