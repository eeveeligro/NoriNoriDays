import { Button } from "@mui/material";
import { Container } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type CustomDialogProps ={
    title?: string,
    text?: string,
    buttonText: string,
    flagOnClose?: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    open: boolean
}

const CustomDialog = (
    {title = undefined, text = undefined, buttonText, flagOnClose = false, onClick,
    open}:CustomDialogProps) => {

    return(
        <>
        <Container component = "main" maxWidth = "xs" >
            <Dialog
                open={open}
                fullWidth
                onClose={flagOnClose? onClick: ()=>{}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                {title &&
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                }
                {text &&
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                }
                <DialogActions>
                    <Button
                        variant = "outlined"
                        onClick = {onClick}>
                        {buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
        </>
    );
}
export default CustomDialog;
