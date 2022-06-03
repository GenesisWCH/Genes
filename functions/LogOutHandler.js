import { signOut } from 'firebase/auth';
import { auth } from '../firebase/index';


const LogOutHandler = () => {
    signOut(auth).then(() => {
        setIsAuth(false);
        setUser({});
    });
}

export default LogOutHandler;