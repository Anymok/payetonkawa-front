// src/components/Cart.js
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CartItem } from "./CartItem";
import PropTypes from "prop-types";
import {
	Button,
	Drawer,
	IconButton,
	List,
	Typography,
} from "@material-tailwind/react";
import dayjs from "dayjs";
import { createOrder } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";

export const Cart = ({ openRight, handleOpen }) => {
	const navigate = useNavigate();
	const { cartItems, setCartItems } = useContext(CartContext);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (openRight) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => document.body.classList.remove("overflow-hidden");
	}, [openRight]);

	const handlePayment = async () => {
		setLoading(true);

		const date = dayjs().format("DD/MM/YY");
		const idProducts = cartItems.map((item) => item.id);

		const payload = {
			date,
			idProducts,
		};

		try {
			const response = await createOrder(JSON.stringify(payload));
			if (response.ok) {
				console.log("Payment successful");
				setCartItems([]);
			} else {
				console.error("Payment failed");
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setLoading(false);
			handleOpen();
			navigate("/");
		}
	};

	return (
		<Drawer
			placement="right"
			open={openRight}
			onClose={handleOpen}
			className="p-6"
			size={450}
		>
			<div className="flex items-center justify-between">
				<Typography variant="h4" color="blue-gray">
					Mon Panier
				</Typography>
				<IconButton variant="text" color="blue-gray" onClick={handleOpen}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-5 w-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</IconButton>
			</div>
			<div className="flex flex-col gap-4 h-full overflow-y-auto">
				{cartItems.length === 0 ? (
					<Typography
						variant="h5"
						color="gray"
						className="mb-8 pr-4 font-normal"
					>
						Votre panier est vide
					</Typography>
				) : (
					<List className="flex-1 overflow-y-auto">
						{cartItems.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</List>
				)}
				<div className="mt-auto p-4 mb-3">
					<Button
						variant="gradient"
						color="amber"
						onClick={handlePayment}
						fullWidth
						disabled={loading || cartItems.length === 0}
					>
						{loading ? "Paiement en cours..." : "Confirmer et payer mon panier"}
					</Button>
				</div>
			</div>
		</Drawer>
	);
};

Cart.propTypes = {
	openRight: PropTypes.func,
	handleOpen: PropTypes.func,
};
