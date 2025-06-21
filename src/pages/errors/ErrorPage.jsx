import { Button, Typography } from "@material-tailwind/react";
import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="container flex mx-auto flex-col justify-center items-center h-screen">
			<Typography variant="h1" className="text-center">
				404
			</Typography>
			<Typography variant="h2" className="text-center">
				La page que vous recherchez n’existe pas (surement partie se chercher un
				café)
			</Typography>
			<Typography variant="paragraph">
				Sorry, an unexpected error has occurred.
			</Typography>
			<Typography variant="paragraph">
				<i>{error.statusText || error.message}</i>
			</Typography>
			<Button className="mt-4">
				<NavLink to={`/`}>Accueil</NavLink>
			</Button>
		</div>
	);
}
