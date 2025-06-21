import { useKeycloak } from "@react-keycloak/web";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
	const { keycloak } = useKeycloak();
	const isLoggedIn = keycloak.authenticated;

	useEffect(() => {
		if (!isLoggedIn) {
			keycloak.login({ redirectUri: window.location.href });
		}
	}, [isLoggedIn, keycloak]);

	return isLoggedIn ? children : null;
}

ProtectedRoute.propTypes = {
	children: PropTypes.object,
};
