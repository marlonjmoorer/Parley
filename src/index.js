import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
const Main = () => (
   <App/>
);


ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
