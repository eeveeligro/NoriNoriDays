import React from "react";
import { BottomButton } from "../components/BottomButton";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";

function Test({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <>
      <Title>点検</Title>
      <UserName>{userName}</UserName>
      <BottomButton onClick = {() => setMenu(0)}>TOP MENU</BottomButton>
    </>
    );
  }
  export default Test;