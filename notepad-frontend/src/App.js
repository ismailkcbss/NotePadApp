import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home'
import Login from './User/Login'
import Register from './User/Register'
import EditUser from './User/EditUser'
import Dashboard from './User/Dashboard';
import { useEffect, useState } from 'react';
import { axiosInstance } from './axios.util';
import * as storage from './storage.helper'
import { userActions } from './redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedAdmin, ProtectedPageRoute,ProtectedReturnPage } from './User/ProtectedRoute';
import Contact from './User/Contact';
import NoteView from './Notes/NoteView';
import NewPassword from './User/NewPassword';
import PasswordReset from './User/PasswordReset';
import alertify from 'alertifyjs';
import Navbar from './Components/Navbar';
import AdminPanel from './Components/AdminPanel';
import RegisterDesc from './Components/RegisterDesc';
import NewPassDesc from './Components/NewPassDesc';
import CheckRegister from './Components/CheckRegister';


function App() {
    alertify.set('notifier', 'delay', 4); // alert mesajı süresi

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const getUserData = async () => {
        const token = storage.getValueByKey("jwt");
        if (token) {
            try {
                const { data } = await axiosInstance.get('/Users/UserMe');
                dispatch(userActions.login(data))
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
            <Navbar/>
            <Switch>
                
                <Route exact path='/' component={Home} />
                <Route exact path='/Contact' component={Contact} />

                <ProtectedReturnPage exact path='/PasswordReset' component={PasswordReset} />
                <ProtectedReturnPage exact path='/RegisterDesc' component={RegisterDesc} />
                <ProtectedReturnPage exact path='/Login' component={Login} />
                <ProtectedReturnPage exact path='/Register' component={Register} />

                <ProtectedPageRoute exact path='/NewPassword' component={NewPassword} />
                <ProtectedPageRoute exact path='/NewPassDesc' component={NewPassDesc} />
                <ProtectedPageRoute exact path='/CheckRegister' component={CheckRegister} />
                <ProtectedPageRoute exact path='/EditUser/:id' component={EditUser} />
                <ProtectedPageRoute exact path='/NoteView' component={NoteView} />
                <ProtectedPageRoute exact path='/NoteView/:id' component={NoteView} />
                <ProtectedPageRoute exact path='/Dashboard' component={Dashboard} />

                <ProtectedAdmin exact path='/AdminPanel' component={AdminPanel} />

            </Switch>
        </BrowserRouter>
    )
}
export default App;
