import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home'
import Login from './User/Login'
import Register from './User/Register'
import EditUser from './User/EditUser'
import Dashboard from './User/Dashboard';
import { useEffect } from 'react';
import { axiosInstance } from './axios.util';
import * as storage from './storage.helper'
import { userActions } from './redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './User/ProtectedRoute';
import Contact from './User/Contact';
import NoteView from './Notes/NoteView';
import NewPassword from './User/NewPassword';
import PasswordReset from './User/PasswordReset';
import alertify from 'alertifyjs';


function App() {
    alertify.set('notifier', 'delay', 4); // alert mesajı süresi

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    

     const getUserData = async () => {
        const token = storage.getValueByKey("jwt");
        if (token) {
            try {
                const { data } = await axiosInstance.get('/Users/UserMe');
                dispatch(userActions.set(data.user)) 
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        // sayfa refresh edilince kullanıcı var mı yok mu bilgisi gidicek o yüzden localdeki token ı alalım ve userı isteyelim
        if (!user.isAuth) getUserData();
    }, [user.isAuth])

  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/Register' component={Register} />
            <Route exact path='/EditUser/:id' component={EditUser} />
            <Route exact path='/Home' component={Home} />
            <Route exact path='/Contact' component={Contact} />
            <Route exact path='/NoteView' component={NoteView} />
            <Route exact path='/NoteView/:id' component={NoteView} />
            <Route exact path='/PasswordReset' component={PasswordReset} />
            <Route exact path='/NewPassword' component={NewPassword} />
            <ProtectedRoute exact path='/Dashboard' component={Dashboard} />
        </Switch>
    </BrowserRouter>
)
}
export default App;
