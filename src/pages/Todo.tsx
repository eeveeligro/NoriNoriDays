import { Button, Card, Container, Grid, IconButton, TextField, Typography } from "@mui/material";
import { addDoc, collection, getDocs, serverTimestamp, query, where, orderBy, deleteDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { BottomButton } from "../components/BottomButton";
import { Title } from "../components/Title";
import db from "../firebase";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

function Todo({selected, setSelected }:{selected:any, setSelected:React.Dispatch<any>}) {
    const [ todoList, setTodoList ] = useState<any>([]);
    const [ doneList, setDoneList ] = useState<any>([]);
    const [ newTodo, setNewTodo ] = useState("");

    const textRef = useRef<any>();
    const userName = localStorage.getItem("userName");

    async function addTodo(){
        // console.log(newTodo + "を追加");
        const docRef = await addDoc(collection(db, "category", selected.id, "todos"), {
            is_done: false,
            title: newTodo,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
            created_by: userName,
            updated_by: userName
        })
        textRef.current.value = "";
    }

    async function deleteTodo(id:string){
        // console.log(id + "を削除");
        await deleteDoc(doc(db, "category", selected.id, "todos", id));
    }

    async function changeStatus(id:string){
        // console.log(id + "のステータスを変更");
        await setDoc(doc(db, "category", selected.id, "todos", id),{
            is_done: true,
            updated_at: serverTimestamp(),
            updated_by: userName
        }, { merge: true });
    }

    useEffect(() => {
        // const query = collection(db, "category", selected.id, "todos");
        const todoRef = collection(db, "category", selected.id, "todos");

        // const q = query(todoRef, where("is_done", "==", false ), orderBy("title"));
        const q = query(todoRef, orderBy("created_at"), where("is_done", "==", false ));

        // getDocs(q).then((snapShot) => {
        //     // setTodoList(snapShot.docs.map((doc) => ({ ...doc.data() })));
        //     setTodoList(snapShot.docs);
        // });
        onSnapshot(q,(snapShot) => {
            // setTodoList(snapShot.docs.map((doc) => ({ ...doc.data() })));
            setTodoList(snapShot.docs);
        });

        const  q_done = query(todoRef, where("is_done", "==", true) , orderBy("updated_at", "desc") );

        // getDocs(q_done).then((snapShot) => {
        //     // setTodoList(snapShot.docs.map((doc) => ({ ...doc.data() })));
        //     setDoneList(snapShot.docs);
        // });
        onSnapshot(q_done, (snapShot) => {
            // setTodoList(snapShot.docs.map((doc) => ({ ...doc.data() })));
            setDoneList(snapShot.docs);
        });

    }, []);

    return (
        <>
            <Title>{selected.data().title}</Title>
            <Container component = "main" maxWidth = "xs">
                <Grid container
                    rowSpacing = {1}
                    display = "flex"
                    direction = "column"
                    >
                <Grid item>
                    <Grid container
                        display = 'flex'
                        alignItems = 'center'>
                        <Grid item xs = {10}>
                            <TextField
                                inputRef = {textRef}
                                id = "newTodo"
                                label = "新規"
                                variant = "outlined"
                                margin = "normal"
                                fullWidth
                                onChange={(e) => setNewTodo(e.target.value)}
                                onKeyDown = {e => {
                                    if (e.key == 'Enter'){
                                        addTodo();
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs = {2}>
                            <IconButton onClick = {addTodo} color = "primary">
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                    {todoList.map((todo:any) => (
                        // <MenuButton key = {category.id} icon = "" onClick = {() => setSelected(category.data().title)}>{category.data().title}</MenuButton>
                        // <MenuButton key = {todo.id} icon = "" onClick = {() => {}}>{todo.data().title}</MenuButton>
                        <>
                        <Grid item>
                            <Card>
                                <Grid container
                                    display="flex"
                                    // justifyContent= "center"
                                    alignItems="center"
                                    // direction = "column"
                                    >
                                <Grid item xs={8}>
                                    <Typography
                                        component = "h2"
                                        variant = "subtitle1"
                                        textAlign = "left"
                                        sx = {{m:1}}
                                        >
                                        {todo.data().title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sx = {{paddingInline:1}}>
                                    {/* <MenuButton onClick = {() => {}} icon = "">test</MenuButton> */}
                                    <IconButton onClick = {() => changeStatus(todo.id)} aria-label="make it done">
                                        <CheckCircleIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2} sx = {{paddingInline:1}}>
                                    {/* <MenuButton onClick = {() => {}} icon = "">test</MenuButton> */}
                                    <IconButton onClick = {() => deleteTodo(todo.id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        </>
                        ))
                    }
                <Grid item>
                    <Typography variant = "h5">実行済み</Typography>
                </Grid>
                {doneList.map((todo:any) => (
                        <>
                        <Grid item>
                            <Card key = {todo.id}>
                                <Grid container
                                    display="flex"
                                    // justifyContent= "center"
                                    alignItems="center"
                                    // direction = "column"
                                    >
                                <Grid item xs={6}>
                                    <Typography
                                        component = "h2"
                                        variant = "subtitle1"
                                        textAlign = "left"
                                        sx = {{m:1}}
                                        >
                                        {todo.data().title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        component = "h2"
                                        variant = "subtitle1"
                                        textAlign = "left"
                                        sx = {{m:1}}
                                        >
                                        達成日：
                                        {todo.data().updated_at.toDate().toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        </>
                        ))
                    }
                </Grid>
            </Container>
            <BottomButton onClick = {() => setSelected(undefined)}>もどる</BottomButton>
        </>
    );
}
export default Todo;