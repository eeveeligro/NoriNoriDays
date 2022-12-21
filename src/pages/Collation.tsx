import React from "react";
import { BottomButton } from "../components/BottomButton";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { MenuButton } from "../components/MenuButton";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";

function Collation({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  const labels = [["大同現品票","東北命令書"],["大同現品票","東北現品票"],["東北命令書","東北現品票"]]
  return (
      <>
        <Title>照合({labels[menu-1][0]}⇔{labels[menu-1][1]})</Title>
        <UserName>{userName}</UserName>
        <Container component = "main" maxWidth = "xs">
          <Card sx = {{width:"100%"}}>
            <Grid container
                  display="flex"
                  // justifyContent= "center"
                  alignItems="center"
                  // direction = "column"
                >
            <Grid xs={5}>
              <Typography
                component = "h2"
                variant = "h6"
                textAlign = "left"
                sx = {{m:1, fontWeight : 'bold'}}
                >
                {labels[menu-1][0]}
              </Typography>
            </Grid>
            <Grid xs={7} sx = {{paddingInline:1}}>
              <MenuButton onClick = {() =>{}} icon = {<CameraAltIcon />}>読取り</MenuButton>
            </Grid>
            <TextField
                id = "製番"
                label = "製番"
                variant = "outlined"
                margin = "normal"
                type = "tel"
                fullWidth
                sx = {{ paddingInline:1}}
                onChange={(e) => {}}
              />
            </Grid>
          </Card>
          <Button
            // startIcon = {<LoginIcon />}
            variant = "contained"
            fullWidth
            size = "large"
            sx = {{mt:1, mb:1}}
            onClick = {() => {}}>
              照合
          </Button>
        </Container>
        <BottomButton icon = "" onClick = {() => setMenu(0)}>TOP MENU</BottomButton>
      </>
    );
  }
  export default Collation;