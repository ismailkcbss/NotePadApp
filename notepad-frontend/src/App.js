import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './User/Login'
import Register from './User/Register'
import Dashboard from './User/Dashboard';
import HomePage from './Home/HomePage';
import { useEffect } from 'react';
import { axiosInstance, setApiToken } from './axios.util';
import * as storage from './storage.helper'
import { userActions } from './redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './User/ProtectedRoute';

function App() {

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const getUserData = async () => {
        const token = storage.getValueByKey("jwt");
        if (token) {
            setApiToken(token);
            try {
                const { data } = await axiosInstance.get('/Users/UserMe');
                console.log(data);
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
            <Route exact path='/' component={HomePage} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Register' component={Register} />
            <ProtectedRoute exact auth={user.isAuth} path='/Dashboard' component={Dashboard} />
        </Switch>
    </BrowserRouter>
)
}

export default App;
