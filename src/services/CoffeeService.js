import publicAPI from "./config/publicConfig";

const getCoffees = async () => {
	try {
		const response = await publicAPI.get("/product/");
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error fetching products");
	}
};

const getCoffeeById = async (uid) => {
	try {
		const response = await publicAPI.get(`/product/${uid}`);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.error || "Error fetching products");
	}
};

export { getCoffees, getCoffeeById };
