import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import Tickets from './components/Tickets.jsx';
import Ticket from './components/Ticket.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

if (module.hot) {
    module.hot.accept();
}

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path='/' component={Tickets} />
                <Route path='/ticket/:ticketId' component={Ticket} />
            </div>
        </Router>
    );
};

ReactDOM.render(
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root')
);