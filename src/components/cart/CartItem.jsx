import { useContext } from "react";
import {
	ListItem,
	ListItemSuffix,
	IconButton,
	Typography,
	Chip,
	ListItemPrefix,
	Avatar,
} from "@material-tailwind/react";
import { CartContext } from "../../contexts/CartContext";
import PropTypes from "prop-types";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function TrashIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="h-5 w-5"
		>
			<path
				fillRule="evenodd"
				d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

export const CartItem = ({ item }) => {
	const { removeFromCart } = useContext(CartContext);

	const renderRating = (rating) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 >= 0.5;
		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

		return (
			<div className="flex items-center">
				{[...Array(fullStars)].map((_, index) => (
					<FaStar key={`full-${index}`} className="text-yellow-500" />
				))}
				{halfStar && <FaStarHalfAlt className="text-yellow-500" />}
				{[...Array(emptyStars)].map((_, index) => (
					<FaRegStar key={`empty-${index}`} className="text-yellow-500" />
				))}
			</div>
		);
	};

	return (
		<ListItem>
			<ListItemPrefix>
				<Avatar
					variant="circular"
					alt={`image-${item.name}`}
					src="/cafe-paye-ton-kawa-officiel.jpeg"
				/>
			</ListItemPrefix>
			<div className="flex items-center justify-between w-full">
				<div>
					<Typography color="blue-gray" className="font-medium">
						{item.name}
					</Typography>
					<Typography className="font-normal" color="gray">
						{item.price} €
					</Typography>
					<div className="flex flex-row items-center">
						<Typography
							variant="paragraph"
							color="gray"
							className="font-normal"
						>
							{renderRating(item.rating)}{" "}
						</Typography>
						<Typography
							variant="paragraph"
							color="gray"
							className="font-normal opacity-75 ml-3"
						>
							{item.rating} / 5
						</Typography>
					</div>
					<div className="flex flex-row">
						<Chip value={item.category} />
					</div>
				</div>
				<ListItemSuffix>
					<IconButton
						variant="text"
						color="red"
						onClick={() => removeFromCart(item.id)}
					>
						<TrashIcon />
					</IconButton>
				</ListItemSuffix>
			</div>
		</ListItem>
	);
};

CartItem.propTypes = {
	item: PropTypes.object,
};
