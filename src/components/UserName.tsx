import { Typography } from "@mui/material";
import { ReactNode } from "react";

type UserNameProps ={
    children?: ReactNode
}

export const UserName = (props:UserNameProps) => {
    const {children} = props

    if (children){
        return (
            <Typography textAlign = "right" component = "h2" variant = "subtitle1" margin = {2} >ユーザ：{children}</Typography>
        )
    } else return (
        <></>
    );
};
