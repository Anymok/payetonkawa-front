import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	// Charger le panier depuis Local Storage lors du montage du composant
	useEffect(() => {
		const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
		if (savedCartItems) {
			setCartItems(savedCartItems);
		}
	}, []);

	// Sauvegarder le panier dans Local Storage à chaque modification
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (product) => {
		setCartItems([...cartItems, product]);
	};

	const removeFromCart = (productId) => {
		setCartItems(cartItems.filter((item) => item.id !== productId));
	};

	return (
		<CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.object,
};
