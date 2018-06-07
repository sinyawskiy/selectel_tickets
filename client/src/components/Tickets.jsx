import React from 'react';
import createClass from'create-react-class';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';

function getStateFromFlux() {
    return {
        tickets: AppStore.getTicketsList()
    };
};

const Tickets = createClass({
    getInitialState: function() {
        let tickets = getStateFromFlux();
        return {
            tickets,
            showDialog: false,
            descriptionId: undefined
        };
    },

    componentWillMount() {
        AppActions.getTickets();
    },

    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default Tickets;