import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import GameComponent from '../../container/Game/GameComponent';
import TutorialComponent from '../Tutorial/TutorialComponent';

const Main = () => {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact={true} path="/" component={Landing} />
                <Route exact={true} path="/tutorial" component={TutorialComponent}/>
                <Route exact={true} path="/play" component={GameComponent}/>
            </Switch>
        </Router>
    );
}

const Landing = () => {
    return (
        <h1>
            This is the landing page.
        </h1>
    )
}

const Nav = () => {
    return (
        <div>
            <Link to={"/"}>
                <div>Landing</div>
            </Link>
            <Link to={"/tutorial"}>
                <div>Tutorial</div>
            </Link>
            <Link to={"/play"}>
                <div>Play</div>
            </Link>
        </div>
    )
}

export default Main;