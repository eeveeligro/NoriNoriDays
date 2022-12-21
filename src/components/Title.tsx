import { Typography } from "@mui/material";
import { ReactNode } from "react";

type TitleProps ={
    children: ReactNode
}

export const Title = (props:TitleProps) => {
    return(
        <Typography component = "h1" variant = "h5" margin = {2} >{props.children}</Typography>
    )
};
