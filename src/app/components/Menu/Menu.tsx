"use client";
import {
	Divider,
	Drawer,
	IconButton,
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useTranslations} from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routes } from "@/app/constants/routes";

export const drawerWidth = "300px";

interface MenuItem {
	route: string;
	text: string;
	icon: React.ReactNode;
}

interface MenuProps {
	isMenuOpen: boolean;
	onClose: () => void;
}

interface MenuContentProps {
	onClose?: () => void;
}

const FlagIcon = styled("span")(() => ({
	fontSize: "24px",
}));

const MenuContent = ({ onClose }: MenuContentProps) => {
	const t = useTranslations();
	const menuItems: MenuItem[] = [
		{
			route: routes.accountList,
			text: t("menu.account"),
			icon: <AccountBalanceIcon />,
		},
		{
			route: routes.transactions,
			text: t("menu.transaction"),
			icon: <SyncAltIcon />,
		},
	];
	const router = useRouter();
	const pathName = usePathname();
	return (
		<List>
			{menuItems.map((item) => (
				<ListItem key={item.text} disablePadding>
					<ListItemButton onClick={() => {
						router.push(item.route);
						onClose?.();
					}}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItemButton>
				</ListItem>
			))}
			<Divider />
			<ListItem disablePadding>
					<ListItemButton onClick={() => {
						router.replace(pathName, { locale: "en" });
					}}>
						<ListItemIcon>
						<FlagIcon>🇬🇧</FlagIcon>
							</ListItemIcon>
						<ListItemText primary={"English"} />
					</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
					<ListItemButton onClick={() => {
						router.replace(pathName, { locale: "es" });
					}}>
						<ListItemIcon>
							<FlagIcon>🇪🇸</FlagIcon>
						</ListItemIcon>
						<ListItemText primary={"Español"} />
					</ListItemButton>
			</ListItem>
		</List>
	);
};

const Menu = ({ isMenuOpen, onClose }: MenuProps) => {
	return (
		<>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				anchor="left"
				open={isMenuOpen}
				onClose={onClose}
			>
				<Box>
					<IconButton onClick={onClose}>
						<ChevronLeftIcon />
					</IconButton>
				</Box>
				<Divider />
				<MenuContent onClose={onClose} />
			</Drawer>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
					display: {
						lg: "block",
						xs: "none",
					},
				}}
				variant="permanent"
				anchor="left"
				open
			>
				<Box
					sx={{
						paddingTop: 10,
					}}
				>
					<MenuContent />
				</Box>
			</Drawer>
		</>
	);
};

export default Menu;
