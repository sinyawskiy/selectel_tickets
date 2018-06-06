import React from 'react';
import createClass from'create-react-class';
import api from '../api';

const Tickets = createClass({
    getInitialState: function() {
        return {
            tickets: [],
            showDialog: false,
            descriptionId: undefined
        };
    },
    componentDidMount: function(){
        console.log(api.getTickets());
    },
    render: function() {
        return (
            <div>
            </div>
        );
    }
});

export default Tickets;