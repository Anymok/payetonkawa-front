import { useContext, useEffect, useState } from "react";
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
	Badge,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import { useKeycloak } from "@react-keycloak/web";
import PropTypes from "prop-types";
import { IoCart } from "react-icons/io5";
import { CartContext } from "../../contexts/CartContext";

export function StickyNavbar({ handleDrawerOpen }) {
	const [openNav, setOpenNav] = useState(false);
	const { keycloak } = useKeycloak();
	const isLoggedIn = keycloak.authenticated;
	const { cartItems } = useContext(CartContext);

	const handleLogin = () => {
		keycloak.login();
	};
	const handleRegister = () => {
		keycloak.register();
	};

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<NavLink to={`/cafes`} style={{ marginRight: "18px" }}>
					Cafés
				</NavLink>
			</Typography>
			<Typography
				as="li"
				variant="small"
				color="blue-gray"
				className="p-1 font-normal"
			>
				<NavLink to={`/professionnels`} style={{ marginRight: "18px" }}>
					Professionnels
				</NavLink>
			</Typography>
			{isLoggedIn ? (
				<>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-normal"
					>
						<NavLink to={`/produits`} style={{ marginRight: "18px" }}>
							Produits
						</NavLink>
					</Typography>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-normal"
					>
						<NavLink to={`/commandes`} style={{ marginRight: "18px" }}>
							Commandes
						</NavLink>
					</Typography>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-normal"
					>
						<NavLink to={`/stock`} style={{ marginRight: "18px" }}>
							Stock
						</NavLink>
					</Typography>
				</>
			) : null}
			<Badge
				content={cartItems.length}
				className="bg-amber-500 text-black"
				size="sm"
			>
				<Button
					variant="text"
					onClick={handleDrawerOpen}
					className="flex items-center gap-3 rounded-full"
				>
					<IoCart className="h-5 w-5" />
					Mon panier
				</Button>
			</Badge>
		</ul>
	);

	return (
		<div className="max-h-[768px] w-full">
			<Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-8 py-2 lg:px-8 lg:py-2">
				<div className="flex items-center justify-between text-blue-gray-900">
					<NavLink to={`/`}>
						<img
							src="/paye-ton-kawa-logo.jpg"
							className="h-20"
							alt="Paye Ton Kawa logo"
						/>
					</NavLink>
					<div className="flex items-center gap-4">
						<div className="mr-4 hidden lg:block">{navList}</div>
						{isLoggedIn ? (
							<ProfileMenu />
						) : (
							<div className="flex items-center gap-x-1">
								<Button variant="text" onClick={handleLogin}>
									Connexion
								</Button>
								<Button variant="gradient" onClick={handleRegister}>
									Inscription
								</Button>
							</div>
						)}

						<IconButton
							variant="text"
							className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
							ripple={false}
							onClick={() => setOpenNav(!openNav)}
						>
							{openNav ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									className="h-6 w-6"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</IconButton>
					</div>
				</div>
				<MobileNav open={openNav}>{navList}</MobileNav>
			</Navbar>
		</div>
	);
}

StickyNavbar.propTypes = {
	handleDrawerOpen: PropTypes.func,
};
