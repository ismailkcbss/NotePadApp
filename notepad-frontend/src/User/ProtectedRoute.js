import { Route, Redirect } from 'react-router-dom';
import * as storage from '../storage.helper';
import Cookie from 'js-cookie';
import { useSelector } from 'react-redux';

const ProtectedPageRoute = ({ component: Component, ...rest }) => {

    const GetCookie = (pres) => {
        return Cookie.get(pres);
    };

    const cookie = GetCookie('pres')
    const token = storage.getValueByKey("jwt");

    return (
        <Route {...rest}
            render={(props) => (token || cookie) ? (
                <Component />
            ) : (
                <Redirect to="/Login" />
            )}
        />
    )
}

const ProtectedReturnPage = ({ component: Component, ...rest }) => {
    const user = useSelector((state) => state.user)
    return (
        <Route {...rest}
            render={(props) => user.isAuth ? (
                <Redirect to="/" />
            ) : (
                <Component />
            )}
        />
    )
}

const ProtectedAdmin = ({ component: Component, ...rest }) => {
    const user =  useSelector((state) => state.user)
    return (
        <Route {...rest}
            render={(props) => user.user.Admin ? (
                <Component />
            ) : (
                <Redirect to="/AdminDesc" />
            )
            }
        />
    )
}

export { ProtectedPageRoute, ProtectedAdmin, ProtectedReturnPage }
