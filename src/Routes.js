import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Home from './pages/Home';
import Room from './components/Room';
import VideoChatPage from './pages/VideoChatPage';



const Routes = () => {
    return (
        <Router>
            <div>
                <Route  exact path="/" component={Home}/>
                <Route path="/room/:name" component={VideoChatPage}/>
            </div>
        </Router>
    );
}

export default Routes;