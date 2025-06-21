/* eslint-disable react/no-unescaped-entities */
import { Typography } from "@material-tailwind/react";
import { CoffeeCardSkeleton } from "../../components/cards/CoffeeCardSkeleton";
import { CoffeeCard } from "../../components/cards/CoffeeCard";
import { useEffect, useState } from "react";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { getCoffees } from "../../services/CoffeeService";

export default function Coffee() {
	const [isLoading, setIsLoading] = useState(true);
	const [coffees, setCoffees] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCoffees = async () => {
			setIsLoading(true);
			try {
				const data = await getCoffees();
				if (!ignore) {
					setCoffees(data);
				}
			} catch (error) {
				setError(error);
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
	}, []);

	return (
		<div className="mx-auto max-w-screen-xl py-12">
			{error ? (
				<div className="flex flex-row items-center justify-center">
					<Typography variant="h2">
						Il semblerait que la machine n'est plus de cafés à disposition...
					</Typography>
				</div>
			) : (
				<>
					<Typography
						variant="h1"
						className="mt-8 mb-8 flex flex-row items-center"
					>
						<PiCoffeeBeanFill className="mr-4" /> Tous nos cafés
					</Typography>
					<div className="grid gap-x-8 gap-y-4 grid-cols-3">
						{isLoading
							? Array(6)
									.fill()
									.map((_, index) => <CoffeeCardSkeleton key={index} />)
							: coffees.map((coffee) => (
									<CoffeeCard key={coffee.id} coffee={coffee} />
						))}
					</div>
				</>
			)}
		</div>
	);
}
