import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Home from './components/Home';
import Room from './components/Room';


const Routes = () => {
    return (
        <Router>
            <div>
                <Route  exact path="/" component={Home}/>
                <Route path="/room/:name" component={Room}/>
            </div>
        </Router>
    );
}

export default Routes;