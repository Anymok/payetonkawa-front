import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
	url: "https://iam.varea-coffee.com/auth",
	realm: "master",
	clientId: "vareaFront",
});

export default keycloak;
