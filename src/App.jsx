import { useState } from "react";
import { StickyNavbar } from "./components/navigation/StickyNavbar";
import { Outlet } from "react-router-dom";
import { Cart } from "./components/cart/Cart";

export const App = () => {
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleDrawerOpen = () => {
		setOpenDrawer(!openDrawer);
	};

	return (
		<>
			<StickyNavbar handleDrawerOpen={handleDrawerOpen} />
			<Outlet />
			<Cart openRight={openDrawer} handleOpen={handleDrawerOpen} />
		</>
	);
};
