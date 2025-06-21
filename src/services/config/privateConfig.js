import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const token = Cookies.get("keycloak-token");

const privateAPI = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	timeout: 10000,
});

export default privateAPI;
