import { useState, useEffect } from 'react';
import Header from './Header';
import Collation from './Collation';
import Inspection from './Inspection';
import Login from './Login'
import StorageSearch from './StorageSearch';
import StorageRegister from './StorageRegister';
import Test from './Test';
import { Container } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DifferenceIcon from '@mui/icons-material/Difference';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GetAppIcon from '@mui/icons-material/GetApp';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuButton } from '../components/MenuButton';
import { BottomButton } from '../components/BottomButton';
import { UserName } from '../components/UserName';
import CustomDialog from '../components/CustomDialog';
import { collection, doc, DocumentData, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import db from '../firebase';
import Todo from './Todo';

function TopMenu(){
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState("");
    const [ open, setOpen ] = useState(false);
    const [ categories, setCategories] = useState<any>([]);
    const [ selected, setSelected ] = useState("");

    useEffect(() => {
        const query = collection(db, "category");

        getDocs(query).then((snapShot) => {
            setCategories(snapShot.docs.map((doc) => ({ ...doc.data() })));
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

        { selected === "" &&
        loggedIn &&
        <>
        <UserName>{userName}</UserName>
        <Container component = "main" maxWidth = "xs">
            {categories.map((category:any) => (
                    <MenuButton key = {category.title} icon = "" onClick = {() => setSelected(category.title)}>{category.title}</MenuButton>
                ))
            }
        </Container>
        <BottomButton icon = {<LogoutIcon />}onClick = {() => setOpen(true)}>ログアウト</BottomButton>
        </>
        }
        { selected !== "" &&
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