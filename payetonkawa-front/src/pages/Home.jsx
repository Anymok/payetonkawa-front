import { Typography } from "@material-tailwind/react";
import { CoffeeCard } from "../components/cards/CoffeeCard";
import { PiCoffeeBeanFill } from "react-icons/pi";

const topCoffees = [
	{
		id: "1",
		name: "Café Arabica Gourmet - Torréfaction Artisanale",
		price: 95.0,
		description:
			"Plongez dans une expérience sensorielle unique avec notre Café Arabica Gourmet, soigneusement sélectionné et torréfié artisanalement pour éveiller vos papilles. Idéal pour les amateurs de café exigeants, notre Arabica Gourmet vous offre un goût riche et raffiné qui enchantera chaque tasse.",
		rating: 4.8,
	},
	{
		id: "2",
		name: "Café Robusta Intense - Saveur Puissante",
		price: 85.0,
		description: `Découvrez la puissance et l'intensité de notre Café Robusta Intense, spécialement conçu pour les amateurs de saveurs corsées. Une expérience de dégustation robuste et énergique.`,
		rating: 4.7,
	},
	{
		id: "3",
		name: "Mélange Expresso - Parfait pour vos Matins",
		price: 75.0,
		description: `Notre Mélange Expresso est l'équilibre parfait entre intensité et douceur, idéal pour commencer votre journée avec énergie. Torréfaction moyenne pour un goût raffiné.`,
		rating: 4.6,
	},
];

export const Home = () => {
	return (
		<div className="mx-auto max-w-screen-2xl py-12">
			<img
				className="h-96 w-full rounded-lg object-cover object-center"
				src="/cafe-vrac-01.webp"
				alt="image café avec tasse"
			/>
			<div>
				<Typography
					variant="h1"
					className="mt-8 mb-8 flex flex-row items-center"
				>
					<PiCoffeeBeanFill className="mr-4" /> Nos meilleurs Cafés
				</Typography>
				<div className="grid grid-cols-3">
					{topCoffees.map((coffee) => (
						<CoffeeCard key={coffee.id} coffee={coffee} />
					))}
				</div>
			</div>
		</div>
	);
};
