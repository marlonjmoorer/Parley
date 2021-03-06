import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Home from './pages/Home';
import VideoChat from './pages/VideoChat';



const Routes = () => {
    return (
        <Router>
            <div>
                <Route  exact path="/" component={Home}/>
                <Route path="/room/:roomname" component={VideoChat}/>
            </div>
        </Router>
    );
}

export default Routes;