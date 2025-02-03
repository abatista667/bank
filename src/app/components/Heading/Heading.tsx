import { Typography } from "@mui/material";
import { Root } from "./styles";

interface HeadingProps {
  title: string;
  action: React.ReactNode;
}

const Heading = ({ title, action }: HeadingProps) => {
  return (
    <Root>
      <Typography variant="h5">{title}</Typography>
      <div>{action}</div>
    </Root>
  );
};

export default Heading;
