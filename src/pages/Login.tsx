import { useState } from "react";
import Button from '@mui/material/Button';
import { Container } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import { BottomButton } from "../components/BottomButton";
import LoginIcon from '@mui/icons-material/Login';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomDialog from "../components/CustomDialog";
import { Title } from "../components/Title";

function Login({menu, loggedIn, userName, setMenu, setLoggedIn, setUserName}:
  {menu:number, loggedIn:boolean, userName:string,
    setMenu:React.Dispatch<React.SetStateAction<number>>,
    setLoggedIn:React.Dispatch<React.SetStateAction<boolean>>,
    setUserName:React.Dispatch<React.SetStateAction<string>>
  }) {
    const [userId, setUserId] = useState("");
    const [openSuccess, setOpenSuccess ] = useState(false);
    const [openFailure, setOpenFailure ] = useState(false);

    function CallLoginApi () {
      const idList = [
        {"id":"0000", "userName":"大田須太郎"},
        {"id":"1234", "userName":"東北花子"},
        {"id":"9999", "userName":"仙台太郎"},
      ];

      let idx = idList.findIndex(idx => idx.id === userId);
      if (idx >=0 ){
        setLoggedIn(true);
        localStorage.setItem("authToken", "token");
        localStorage.setItem("userName", idList[idx].userName);
        setOpenSuccess(true);
      } else {
        setOpenFailure(true);
      }
    }

    return (
      <>
        <div>
          <Title>ログイン</Title>
          <Container component = "main" maxWidth = "xs">
            <Grid2 container
              display="flex"
              justifyContent= "center"
              alignItems="center"
              direction = "column"
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant = "subtitle1" sx = {{color: 'error.main'}}>従業員番号でログインしてください</Typography>
              <TextField
                id = "従業員番号"
                label = "従業員番号"
                variant = "outlined"
                margin = "normal"
                type = "tel"
                fullWidth
                onChange={(e) => setUserId(e.target.value)}
                onKeyDown = {e => {
                  if (e.key == 'Enter'){
                    CallLoginApi()
                  }
                }}
              />
              <Button
                startIcon = {<LoginIcon />}
                variant = "contained"
                fullWidth
                size = "large"
                onClick = {() => CallLoginApi()}>
                  ログイン
              </Button>
            </Grid2>
          </Container>
        </div>
        <CustomDialog
          title = "ログインしました"
          buttonText = "閉じる"
          flagOnClose
          onClick = {()=>{
            setOpenSuccess(false);
            setMenu(0);
          }}
          open = {openSuccess}
        />
        <CustomDialog
          title = "対象者不明"
          text = "『従業員番号』を確認してください"
          buttonText = "閉じる"
          // flagOnClose
          onClick = {()=>{
            setOpenFailure(false);
          }}
          open = {openFailure}
        />
        <BottomButton onClick = {() => setMenu(0)}>TOP MENU</BottomButton>
      </>
    );
  }
  export default Login;