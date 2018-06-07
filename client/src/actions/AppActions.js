import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const AppActions = {
    getTickets() {
        api.getTickets()
            .then(data => {
                AppDispatcher.dispatch({
                    type  : AppConstants.GET_TICKETS_SUCCESS,
                    items : data.tickets
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type  : AppConstants.GET_TICKETS_FAIL,
                    error : err
                });
            });
    },
    getTicket(params) {
        api.getTicket(params.id)
            .then(data => {
                AppDispatcher.dispatch({
                    type : AppConstants.GET_TICKET_SUCCESS,
                    item : data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type  : AppConstants.GET_TICKET_FAIL,
                    error : err
                });
            });
    },
    addTicket(params) {
        api.addTicket(params.message, params.subject, params.email)
            .then(data => {
                AppDispatcher.dispatch({
                    type : AppConstants.ADD_TICKET_SUCCESS,
                    item : data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type  : AppConstants.ADD_TICKET_FAIL,
                    error : err
                });
            });
    },
    getTicketComments(params) {
        api.getTicketComments(params.id)
            .then(data => {
                AppDispatcher.dispatch({
                    type : AppConstants.GET_TICKET_COMMENTS_SUCCESS,
                    item : data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type  : AppConstants.GET_TICKET_COMMENTS_FAIL,
                    error : err
                });
            });
    },
    addTicketComment(params) {
        api.addTicketComment(params.id)
            .then(data => {
                AppDispatcher.dispatch({
                    type : AppConstants.ADD_COMMENT_SUCCESS,
                    item : data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type  : AppConstants.ADD_COMMENT_FAIL,
                    error : err
                });
            });
    },
    changeTicketState(params) {
        api.changeTicketState(params.id)
            .then(data => {
                AppDispatcher.dispatch({
                    type : AppConstants.CHANGE_TICKET_STATE_SUCCESS,
                    item : data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type  : AppConstants.CHANGE_TICKET_STATE_FAIL,
                    error : err
                });
            });
    },
    closeTicket(params) {
        api.closeTicket(params.id)
            .then(data => {
                AppDispatcher.dispatch({
                    type : AppConstants.GET_TICKET_COMMENTS_SUCCESS,
                    item : data
                });
            })
            .catch(err => {
                AppDispatcher.dispatch({
                    type  : AppConstants.GET_TICKET_COMMENTS_FAIL,
                    error : err
                });
            });
    }

};

export default AppActions;