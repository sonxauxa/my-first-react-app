import React from 'react';
import './App.css';
import Login from "./components/login";
import ShowData from "./components/show_data";
import Nav from "./components/nav";
import Home from "./components/home";
import About from "./components/about";
import SignUp from "./components/sign_up";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Show from "./components/paga_page";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/product' component={ShowData}/>
                    <Route path='/data' exact component={Show}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/login' exact component={Login}/>
                </Switch>

            </div>
        </Router>

    );
}

export default App;
