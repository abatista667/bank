import { Paper, PaperTypeMap, styled } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type FormCardProps = OverridableComponent<PaperTypeMap<{}, "form">>

export const Root = styled(Paper)(() => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	paddingBlock: 20,
	paddingInline: 40,
	marginBottom: 20,
})) as FormCardProps;


export const Fields = styled("div")(({theme}) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
    },
}));
export const FieldGroup = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    gap: 4,
}));

export const Actions = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "end",
    gap: 8,
    marginTop: 16,
    [theme.breakpoints.up("sm")]:{
        flexDirection: "row",
    }
}));

export const Row = styled("div")(({theme}) => ({
	display: "flex",
	gap: 8,
	flexDirection: "column",
	[theme.breakpoints.up("md")]: {
		flexDirection: "row",
	},
}));