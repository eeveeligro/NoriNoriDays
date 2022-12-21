import { Button } from "@mui/material";
import { ReactNode } from "react";

type MenuButtonProps ={
    icon: any,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    children: ReactNode
}

export const MenuButton = (props:MenuButtonProps) => {
    const { icon, onClick } = props

    return(
        <div>
            <Button
            onClick = {onClick}
            startIcon = {icon}
            sx= {{marginBottom:1, marginTop:1}}
            variant = "contained"
            size = "large"
            fullWidth= {true}
            >{props.children}</Button>
        </div>
    )
};
