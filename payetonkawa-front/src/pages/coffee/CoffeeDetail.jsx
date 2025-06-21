import { Button, Chip, Spinner, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { getCoffeeById } from "../../services/CoffeeService";
import { CartContext } from "../../contexts/CartContext";

const useCoffeeDetail = () => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [coffee, setCoffee] = useState(null);

	useEffect(() => {
		const fetchCoffees = async () => {
			setIsLoading(true);
			try {
				const data = await getCoffeeById(params.id);
				if (!ignore) {
					setCoffee(data[0]);
				}
			} catch (error) {
				console.error("Erreur lors de la récupération des cafés:", error);
			} finally {
				setIsLoading(false);
			}
		};

		let ignore = false;

		fetchCoffees();

		return () => {
			ignore = true;
		};
	}, [params.id]);

	return { coffee, isLoading };
};

export const CoffeeDetail = () => {
	const { coffee, isLoading } = useCoffeeDetail();
	const { addToCart } = useContext(CartContext);

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
		<div className="container mx-auto p-6">
			{isLoading ? (
				<Spinner className="h-12 w-12" />
			) : (
				<>
					<div className="flex flex-col lg:flex-row">
						<div className="lg:w-1/2 p-4">
							<img
								src="/cafe-paye-ton-kawa-officiel.jpeg"
								alt={`image-${coffee.name}`}
								className="h-full w-full object-cover rounded-lg"
							/>
						</div>
						<div className="lg:w-1/2 p-4 flex flex-col justify-between">
							<Typography
								color="blue-gray"
								variant="h1"
								className="font-medium mb-4"
							>
								{coffee.name}
							</Typography>
							<Typography
								color="blue-gray"
								variant="h2"
								className="font-medium mb-4"
							>
								{coffee.price} €
							</Typography>
							<div className="flex flex-row items-center">
								<Typography
									variant="paragraph"
									color="gray"
									className="font-normal"
								>
									{renderRating(coffee.rating)}{" "}
								</Typography>
								<Typography
									variant="paragraph"
									color="gray"
									className="font-normal opacity-75 ml-3"
								>
									{coffee.rating} / 5
								</Typography>
							</div>
							<Typography
								variant="paragraph"
								color="gray"
								className="font-normal opacity-75 mb-4"
							>
								{coffee.description}
							</Typography>
							<div className="flex flex-row items-baseline mb-2">
								<Typography
									variant="paragraph"
									color="gray"
									className="font-normal opacity-75"
								>
									<strong>Stock :</strong>
								</Typography>
								<Typography
									variant="paragraph"
									color="gray"
									className="font-normal opacity-75 ml-3"
								>
									{coffee.stock}
								</Typography>
							</div>
							<div className="flex flex-row items-baseline">
								<Typography
									variant="paragraph"
									color="gray"
									className="font-normal opacity-75 mb-2 mr-3"
								>
									<strong>Catégorie :</strong>
								</Typography>
								<Chip value={coffee.category} />
							</div>
							<div className="flex space-x-4">
								<Button
									size="lg"
									ripple={false}
									className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
									onClick={() => addToCart(coffee)}
								>
									Ajouter au panier
								</Button>
								<Button
									size="lg"
									color="amber"
									ripple={false}
									className="shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
								>
									Acheter maintenant
								</Button>
							</div>
						</div>
					</div>
					{/* <div className="mt-8">
						<Typography color="blue-gray" className="font-medium text-xl mb-4">
							Caractéristiques :
						</Typography>
						<Typography>{coffee.characteristic}</Typography>
					</div> */}
					{/* TODO : Avis des utilisateurs */}
					{/* <div className="mt-8">
						<Typography color="blue-gray" className="font-medium text-xl mb-4">
							Avis des utilisateurs :
						</Typography>
						{coffee.reviews.map((review, index) => (
							<div key={index} className="mb-4">
								<Typography
									variant="small"
									color="blue-gray"
									className="font-medium"
								>
									{review.user}
								</Typography>
								<Typography
									variant="small"
									color="gray"
									className="font-normal opacity-75"
								>
									{review.comment}
								</Typography>
								<div className="flex flex-row items-center">
									<Typography
										variant="paragraph"
										color="gray"
										className="font-normal"
									>
										{renderRating(coffee.rating)}{" "}
									</Typography>
									<Typography
										variant="paragraph"
										color="gray"
										className="font-normal opacity-75 ml-3"
									>
										{coffee.rating} / 5
									</Typography>
								</div>
							</div>
						))}
					</div> */}
				</>
			)}
		</div>
	);
};
