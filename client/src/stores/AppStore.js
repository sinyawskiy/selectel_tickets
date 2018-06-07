import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _ticketsList = [];
let _ticketComments = [];
let _error = null;
let _ticket = {
    id: 0,
    subject: '',
    message: '',
    created_at: null,
    email: ''
};

const AppStore = Object.assign({}, EventEmitter.prototype, {
    getTicketsList() {
        return _ticketsList;
    },
    getTicket(){
        return _ticket;
    },
    getTicketCommentsList(){
        return _ticketComments;
    },
    emitChange(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(action => {
   console.log(action.type, action);
   switch(action.type){
       case AppConstants.GET_TICKETS_SUCCESS: {
            _ticketsList = action.items;
            AppStore.emitChange();
            break;
       }
       case AppConstants.GET_TICKETS_FAIL: {
           _ticketsList = [];
           _error = action.error;
           AppStore.emitChange();
           break;
       }
       case AppConstants.GET_TICKET_SUCCESS: {
           _ticket = action.item;
           AppStore.emitChange();
           break;
       }
       case AppConstants.GET_TICKET_FAIL: {
           _ticket = null;
           _error = action.error;
           AppStore.emitChange();
           break;
       }
       case AppConstants.ADD_TICKET_SUCCESS: {
           _ticketsList.push(action.item);
           AppStore.emitChange();
           break;
       }
       case AppConstants.ADD_TICKET_FAIL: {
           _error = action.error;
           AppStore.emitChange();
           break;
       }
       case AppConstants.ADD_COMMENT_SUCCESS: {
           _ticketComments.push(action.item);
           AppStore.emitChange();
           break;
       }
       case AppConstants.ADD_COMMENT_FAIL: {
           _error = action.error;
           AppStore.emitChange();
           break;
       }
       case AppConstants.GET_TICKET_COMMENTS_SUCCESS: {
           _ticketComments = action.items;
           AppStore.emitChange();
           break;
       }
       case AppConstants.GET_TICKET_COMMENTS_FAIL: {
           _ticketComments = [];
           _error = action.error;
           AppStore.emitChange();
           break;
       }
       case AppConstants.CHANGE_TICKET_STATE_SUCCESS: {
           _ticket = action.item;
           AppStore.emitChange();
           break;
       }
       case AppConstants.CHANGE_TICKET_STATE_FAIL: {
           _error = action.error;
           AppStore.emitChange();
           break;
       }
       case AppConstants.CLOSE_TICKET_SUCCESS: {
           let ticket = action.item;
           _ticketsList.find(x => x.id === ticket.id).state = ticket.state;
           AppStore.emitChange();
           break;
       }
       case AppConstants.CLOSE_TICKET_FAIL: {
           _error = action.error;
           AppStore.emitChange();
           break;
       }
       default: {
       }
   }
});
export default AppStore;
