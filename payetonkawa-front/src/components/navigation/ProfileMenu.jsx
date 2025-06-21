import React, { useState } from "react";
import {
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
} from "@material-tailwind/react";
import {
	UserCircleIcon,
	ChevronDownIcon,
	PowerIcon,
} from "@heroicons/react/24/solid";
import { useKeycloak } from "@react-keycloak/web";
import { NavLink } from "react-router-dom";

export const ProfileMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { keycloak } = useKeycloak();

	// profile menu component
	const profileMenuItems = [
		{
			label: "Mon Compte",
			icon: UserCircleIcon,
			url: "/mon-compte",
		},
		{
			label: "Déconnexion",
			icon: PowerIcon,
			isButton: true,
		},
	];

	const handleLogout = () => {
		keycloak.logout({
			redirectUri: window.location.origin, // Rediriger après la déconnexion
		});
	};

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					<Avatar
						variant="circular"
						size="sm"
						alt="tania andrew"
						className="border border-gray-900 p-0.5"
						src="/paye-ton-kawa.png"
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? "rotate-180" : ""
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{profileMenuItems.map(({ label, icon, url, isButton }, key) => {
					const isLastItem = key === profileMenuItems.length - 1;
					return (
						<MenuItem
							key={label}
							onClick={closeMenu}
							className={`flex items-center gap-2 rounded ${
								isLastItem
									? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
									: ""
							}`}
						>
							{React.createElement(icon, {
								className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
								strokeWidth: 2,
							})}
							{isLastItem && isButton ? (
								<NavLink to="#" onClick={handleLogout}>
									<Typography
										as="span"
										variant="small"
										className="font-normal"
										color="red"
									>
										{label}
									</Typography>
								</NavLink>
							) : (
								<NavLink to={url}>
									<Typography
										as="span"
										variant="small"
										className="font-normal"
										color="inherit"
									>
										{label}
									</Typography>
								</NavLink>
							)}
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
};
