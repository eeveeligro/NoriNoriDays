import { Button } from "@mui/material";
import { ReactNode } from "react";

type BottomButtonProps ={
    icon?: any,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    children: ReactNode
}

export const BottomButton = (props:BottomButtonProps) => {
    const { icon = undefined, onClick, children } = props

    return(
        <div>
            <Button
            onClick = {onClick}
            startIcon = {icon}
            sx={{marginBottom:1, marginTop:4}}
            variant = "contained"
            size = "large"
            >{children}</Button>
        </div>
    )
};
