import React from "react";
import { BottomButton } from "../components/BottomButton";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";

function Inspection({menu, userName, setMenu}:{menu:number, userName:string, setMenu:React.Dispatch<React.SetStateAction<number>>}) {
  return (
      <>
        <Title>素材検品</Title>
        <UserName>{userName}</UserName>
        <BottomButton onClick = {() => setMenu(0)}>TOP MENU</BottomButton>
      </>
    );
  }
  export default Inspection;