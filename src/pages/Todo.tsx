import React from "react";
import { BottomButton } from "../components/BottomButton";
import { Title } from "../components/Title";
import { UserName } from "../components/UserName";

function Todos({selected, setSelected }:{selected:string, setSelected:React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <>
            <Title>{selected}</Title>
            <BottomButton onClick = {() => setSelected("")}>もどる</BottomButton>
        </>
    );
}
export default Todos;