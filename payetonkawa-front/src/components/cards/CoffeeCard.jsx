import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export const CoffeeCard = ({ coffee }) => {
	const navigate = useNavigate();
	const { addToCart } = useContext(CartContext);

	const handleViewMore = () => {
		navigate(`/cafe/${coffee.id}`);
	};

	const truncatedDescription =
		coffee.description.slice(0, 100) +
		(coffee.description.length > 100 ? "..." : "");

	return (
		<Card className="w-96">
			<NavLink to="#" onClick={handleViewMore}>
				<CardHeader shadow={false} floated={false} className="h-96">
					<img
						src="/cafe-paye-ton-kawa-officiel.jpeg"
						alt="image-cafe-paye-ton-kawa"
						className="h-full w-full object-cover"
					/>
				</CardHeader>
			</NavLink>
			<CardBody>
				<div className="mb-2 flex items-center justify-between">
					<Typography color="blue-gray" className="font-medium">
						{coffee.name}
					</Typography>
					<Typography color="blue-gray" className="font-medium">
						{coffee.price}€
					</Typography>
				</div>
				<Typography
					variant="small"
					color="gray"
					className="font-normal opacity-75"
				>
					{truncatedDescription}
					{coffee.description.length > 100 && (
						<span
							onClick={handleViewMore}
							className="text-blue-500 cursor-pointer"
						>
							{" voir plus"}
						</span>
					)}
				</Typography>
			</CardBody>
			<CardFooter className="pt-0">
				<Button
					ripple={false}
					fullWidth={true}
					className="shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
					onClick={() => addToCart(coffee)}
				>
					Ajouter au panier
				</Button>
			</CardFooter>
		</Card>
	);
};

CoffeeCard.propTypes = {
	coffee: PropTypes.object,
};
