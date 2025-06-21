import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
	Card,
	CardHeader,
	Typography,
	Button,
	CardBody,
	CardFooter,
	IconButton,
	Tooltip,
	Chip,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { BiCartAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/ProductService";

const TABLE_HEAD = [
	"Nom",
	"Description",
	"Marque",
	"Catégorie",
	"Stock",
	"Notation",
	"Prix",
	"",
	"",
	"",
];

export const ProductTable = ({ products }) => {
	const navigate = useNavigate();

	const handleCreateProduct = () => {
		navigate("nouveau");
	};

	const handleDeleteProduct = async (idProduct) => {
		const response = await deleteProduct(idProduct);
		if (response) {
			window.location.reload();
		}
	};

	const handleEditProduct = async (idProduct) => {
		navigate(`edition/${idProduct}`);
	};

	const handleDetailProduct = async (idProduct) => {
		navigate(`/produit/${idProduct}`);
	};

	return (
		<Card className="h-full w-full">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="flex items-center justify-between gap-8">
					<div>
						<Typography variant="h5" color="blue-gray">
							Liste des produits
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							Voir les informations sur tous les produits
						</Typography>
					</div>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button
							className="flex items-center gap-3"
							size="md"
							onClick={() => {
								handleCreateProduct();
							}}
						>
							<BiCartAdd className="h-5 w-5" /> Ajouter un produit
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardBody className="px-0">
				<table className="mt-4 w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th
									key={head}
									className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal leading-none opacity-70"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{products.map((product, index) => {
							const isLast = index === products.length - 1;
							const classes = isLast
								? "p-4"
								: "p-4 border-b border-blue-gray-50";

							const truncatedDescription =
								product.description.slice(0, 30) +
								(product.description.length > 30 ? "..." : "");

							return (
								<tr key={product.id}>
									<td className={classes}>
										<div className="flex items-center gap-3">
											<div className="flex flex-col">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{product.name}
												</Typography>
											</div>
										</div>
									</td>
									<td className={classes}>
										<div className="flex flex-col">
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{truncatedDescription}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<div className="flex flex-col">
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{product.brand}
											</Typography>
										</div>
									</td>
									<td className={classes}>
										<div className="w-max">
											<Chip size="sm" value={product.category} />
										</div>
									</td>
									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal"
										>
											{product.stock}
										</Typography>
									</td>
									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal"
										>
											{product.rating} / 5
										</Typography>
									</td>

									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal"
										>
											{product.price} €
										</Typography>
									</td>
									<td className={classes}>
										<Tooltip content="Voir le produit">
											<IconButton
												variant="text"
												color="amber"
												onClick={() => {
													handleDetailProduct(product.id);
												}}
											>
												<EyeIcon className="h-4 w-4" />
											</IconButton>
										</Tooltip>
									</td>
									<td className={classes}>
										<Tooltip content="Modifier le produit">
											<IconButton
												variant="text"
												color="blue"
												onClick={() => {
													handleEditProduct(product.id);
												}}
											>
												<PencilIcon className="h-4 w-4" />
											</IconButton>
										</Tooltip>
									</td>
									<td className={classes}>
										<Tooltip content="Supprimer le produit">
											<IconButton
												variant="text"
												color="red"
												onClick={() => {
													handleDeleteProduct(product.id);
												}}
											>
												<TrashIcon className="h-4 w-4" />
											</IconButton>
										</Tooltip>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
				<Typography variant="small" color="blue-gray" className="font-normal">
					Page 1 sur 10
				</Typography>
				<div className="flex gap-2">
					<Button variant="outlined" size="sm">
						Précédent
					</Button>
					<Button variant="outlined" size="sm">
						Suivant
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

ProductTable.propTypes = {
	products: PropTypes.object,
};
