import { useState, useEffect } from 'react';
import Header from './Header';
import Login from './Login'
import { Button, Container } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuButton } from '../components/MenuButton';
import { BottomButton } from '../components/BottomButton';
import { UserName } from '../components/UserName';
import CustomDialog from '../components/CustomDialog';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';
import Todo from './Todo';
import { Copyright } from './Copyright';

function TopMenu(){
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState("");
    const [ open, setOpen ] = useState(false);
    const [ categories, setCategories] = useState<any>([]);
    const [ selected, setSelected ] = useState<any>();

    useEffect(() => {
        const query = collection(db, "category");

        getDocs(query).then((snapShot) => {
            // setCategories(snapShot.docs.map((doc) => ({ ...doc.data() })));
            setCategories(snapShot.docs);
        });
    }, []);

    const token = localStorage.getItem("authToken");
    useEffect(() => {
        if(token !== null){
            setLoggedIn(true)
        }
    }, [token]);

    const userNameStored = localStorage.getItem("userName");
    useEffect(() => {
        if(userNameStored !== null){
            setUserName(userNameStored)
        }
    }, [userNameStored]);

    function Logout() {
        setLoggedIn(false);
        setUserName("");
        localStorage.removeItem("authToken")
        localStorage.removeItem("userName")
    }

    return (
        <>
        <Header />
        { !loggedIn &&
        <>
        <div>
            <Login loggedIn = {loggedIn} userName = {userName}
            setLoggedIn = {setLoggedIn} setUserName = {setUserName}/>
        </div>
        </>
        }

        { selected === undefined &&
        loggedIn &&
        <>
        <UserName>{userName}</UserName>
        <Container component = "main" maxWidth = "xs">
            {categories.map((category:any) => (
                    // <MenuButton key = {category.id} icon = "" onClick = {() => setSelected(category.data().title)}>{category.data().title}</MenuButton>
                    <MenuButton key = {category.id} icon = "" onClick = {() => setSelected(category)}>{category.data().title}</MenuButton>
                ))
            }
        </Container>
        <BottomButton icon = {<LogoutIcon />}onClick = {() => setOpen(true)}>ログアウト</BottomButton>
        <Copyright sx={{ mt: 3 }} />
        </>
        }
        { selected !== undefined &&
        loggedIn &&
        <Todo selected = {selected} setSelected = {setSelected} />
        }
        <CustomDialog
            title = "ログアウトしました"
            buttonText = "閉じる"
            flagOnClose
            onClick = {() => {
                Logout();
                setOpen(false);
            }}
            open = {open}
        />
        </>
    );

}
export default TopMenu;