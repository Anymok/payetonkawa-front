/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { ProductTable } from "../../components/tables/ProductTable";
import { ProductSkeleton } from "../../components/tables/ProductSkeleton";
import { getAllProducts } from "../../services/ProductService";

export default function Products() {
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const data = await getAllProducts();
				if (!ignore) {
					setProducts(data);
				}
			} catch (err) {
				setError(err.message);
				console.error("Erreur lors de la récupération des cafés:", err);
			} finally {
				setIsLoading(false);
			}
		};

		let ignore = false;

		fetchProducts();

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<div className="mx-auto max-w-screen-2xl py-12">
			<Typography variant="h1" className="mt-8 mb-8 flex flex-row items-center">
				Produits
			</Typography>
			<div className="flex">
				{isLoading ? <ProductSkeleton /> : <ProductTable products={products} />}
			</div>
			{error ? (
				<div className="flex flex-row items-center justify-center">
					<Typography variant="h2">
						Il semblerait que la machine n'est plus de cafés à disposition...
					</Typography>
				</div>
			) : null}
		</div>
	);
}
