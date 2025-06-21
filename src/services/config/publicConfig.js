import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const publicAPI = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	timeout: 10000,
});

export default publicAPI;
