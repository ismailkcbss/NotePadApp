import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './User/Login'
import Register from './User/Register'
import Dashboard from './User/Dashboard';
import HomePage from './Home/HomePage';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Register' component={Register} />
            <Route exact path='/Dashboard' component={Dashboard} />
        </Switch>
    </BrowserRouter>
)
}

export default App;
