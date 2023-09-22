import { Route, Redirect } from 'react-router-dom';
import * as storage from '../storage.helper';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';


const ProtectedPageRoute = ({ component: Component, ...rest }) => {
    const token = storage.getValueByKey("jwt");
    return (
        <Route {...rest}
            render={(props) => token ? (
                <Component />
            ) : (
                <Redirect to="/Login" />
            )}
        />
    )
}

const ProtectedReturnPage = ({ component: Component, ...rest }) => {
    const user = useSelector((state) => state.user)
    //cookie den çek
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
    const admin = storage.GetCookie("role")
    const data = jwtDecode(admin);
    var role = data.role;
    return (
        <Route {...rest}
            render={(props) => role ? (
                <Component />
            ) : (
                <Redirect to="/" />
            )
            }
        />
    )
}

export { ProtectedPageRoute, ProtectedAdmin, ProtectedReturnPage }
