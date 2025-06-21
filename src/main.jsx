import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/errors/ErrorPage.jsx";
import Coffee from "./pages/coffee/Coffee.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Products from "./pages/products/Products.jsx";
import Orders from "./pages/Orders.jsx";
import Stock from "./pages/Stock.jsx";
import Account from "./pages/Account.jsx";
import { App } from "./App.jsx";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak.js";
import Profesional from "./pages/Profesional.jsx";
import { CoffeeDetail } from "./pages/coffee/CoffeeDetail.jsx";
import { Home } from "./pages/Home.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import Cookies from "js-cookie";
import { CreateView } from "./pages/products/CreateView.jsx";
import EditView from "./pages/products/EditView.jsx";
import { DetailView } from "./pages/products/DetailView.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "cafes",
				element: <Coffee />,
			},
			{
				path: "cafe/:id",
				element: <CoffeeDetail />,
			},
			{
				path: "professionnels",
				element: <Profesional />,
			},
			{
				path: "produits",
				element: (
					<ProtectedRoute>
						<Products />
					</ProtectedRoute>
				),
			},
			{
				path: "produits/nouveau",
				element: (
					<ProtectedRoute>
						<CreateView />
					</ProtectedRoute>
				),
			},
			{
				path: "produits/edition/:id",
				element: (
					<ProtectedRoute>
						<EditView />
					</ProtectedRoute>
				),
			},
			{
				path: "produit/:id",
				element: (
					<ProtectedRoute>
						<DetailView />
					</ProtectedRoute>
				),
			},
			{
				path: "commandes",
				element: (
					<ProtectedRoute>
						<Orders />
					</ProtectedRoute>
				),
			},
			{
				path: "stock",
				element: (
					<ProtectedRoute>
						<Stock />
					</ProtectedRoute>
				),
			},
			{
				path: "mon-compte",
				element: <Account />,
			},
		],
	},
]);

const handleOnEvent = (event) => {
	if (event === "onAuthSuccess") {
		Cookies.set("keycloak-token", keycloak.token);
	}
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<ReactKeycloakProvider authClient={keycloak} onEvent={handleOnEvent}>
		<CartProvider>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</CartProvider>
	</ReactKeycloakProvider>
);
