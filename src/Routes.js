import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Home from './pages/Home';
import Room from './components/Room';
import VideoChat from './pages/VideoChat';



const Routes = () => {
    return (
        <Router>
            <div>
                <Route  exact path="/" component={Home}/>
                <Route path="/room/:name" component={VideoChat}/>
            </div>
        </Router>
    );
}

export default Routes;