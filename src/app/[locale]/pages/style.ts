import { styled } from "@mui/material";

export const Root = styled("div")(({theme}) => ({
	paddingInline: 10,
	minWidth: 320,
	[theme.breakpoints.up("sm")]: {
		paddingInline: 20,
	},
	[theme.breakpoints.up("lg")]: {
		paddingLeft: 28,
	},
}))
export const Content = styled("div")(({theme}) => ({
	boxSizing: "content-box",
	marginTop: "95px",
	[theme.breakpoints.up("lg")]: {
		paddingLeft: 340,
		width: "calc(100% - 340px)",
	},
}))

