import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Input, Typography, Button, Textarea } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/ProductService";

const CreateForm = () => {
	const [setError] = useState();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmitForm = async (data) => {
		try {
			const response = await createProduct({
				name: data.productName,
				price: parseInt(data.price),
				description: data.description,
				stock: parseInt(data.stock),
				category: data.category,
				brand: data.brand,
				rating: parseInt(data.rating),
				characteristic: "",
			});
			if (response) {
				navigate("/produits");
			}
		} catch (err) {
			if (err && err instanceof AxiosError) {
				setError(err.response?.data.message);
			} else if (err && err instanceof Error) {
				setError(err.message);
			}
			console.log("Error", err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForm)} className="mt-8 mb-2">
			<div className="block-create-plane">
				<div className="flex flex-row justify-start">
					<Link to="/produits">
						<Typography className="text-l font-normal flex flex-row items-center mb-4">
							<ChevronLeftIcon strokeWidth={2} className="h-4 w-4" /> Retour
						</Typography>
					</Link>
				</div>
				<div className="flex flex-row justify-between">
					<Typography variant="h1" className="text-3xl font-normal">
						Nouveau produit
					</Typography>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button
							type="submit"
							className="flex items-center gap-3"
							size="md"
							color="amber"
						>
							<PlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter un
							produit
						</Button>
					</div>
				</div>
			</div>
			<div className="mt-8 mb-4 flex flex-row justify-center w-full gap-6">
				<div className="flex flex-col w-full gap-6 mt-4">
					<Input
						{...register("productName", { required: true })}
						type="text"
						size="lg"
						label="Nom du produit"
					/>
					{errors.productName && (
						<Typography variant="small" color="red">
							Ce champ est obligatoire
						</Typography>
					)}
					<Input
						{...register("brand", { required: true })}
						type="text"
						size="lg"
						label="Nom de la marque"
					/>
					{errors.brand && (
						<Typography variant="small" color="red">
							Ce champ est obligatoire
						</Typography>
					)}
					<Input
						{...register("price", { required: true })}
						type="number"
						size="lg"
						label="Prix"
					/>
					{errors.price && (
						<Typography variant="small" color="red">
							Ce champ est obligatoire
						</Typography>
					)}
					<Textarea
						{...register("description", { required: true })}
						type="text"
						size="lg"
						label="Description"
					/>
					{errors.description && (
						<Typography variant="small" color="red">
							Ce champ est obligatoire
						</Typography>
					)}
					<Input
						{...register("category", { required: true })}
						type="text"
						size="lg"
						label="Catégorie"
					/>
					{errors.category && (
						<Typography variant="small" color="red">
							Ce champ est obligatoire
						</Typography>
					)}
					<Input
						{...register("stock", { required: true })}
						type="number"
						size="lg"
						label="Stockage"
					/>
					{errors.stock && (
						<Typography variant="small" color="red">
							Ce champ est obligatoire
						</Typography>
					)}
					<Input
						{...register("rating", { required: true })}
						type="number"
						size="lg"
						label="Notation"
						max="5"
						min="0"
					/>
					{errors.rating && (
						<Typography variant="small" color="red">
							Ce champ est obligatoire
						</Typography>
					)}
				</div>
			</div>
		</form>
	);
};

export default CreateForm;
