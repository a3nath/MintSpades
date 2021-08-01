import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import GameComponent from '../../container/Game/GameComponent';
import TutorialComponent from '../Tutorial/TutorialComponent';
import LandingComponent from '../Landing/LandingComponent';

const Main = () => {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact={true} path="/" component={LandingComponent} />
                <Route exact={true} path="/tutorial" component={TutorialComponent}/>
                <Route exact={true} path="/play" component={GameComponent}/>
            </Switch>
        </Router>
    );
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