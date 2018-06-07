import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _ticketsList = [];
let _error = null;

const AppStore = Object.assign({}, EventEmitter.prototype, {
    getTicketsList() {
       return _ticketsList;
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
           break;
       }
       case AppConstants.GET_TICKET_FAIL: {
           break;
       }
       case AppConstants.ADD_TICKET_SUCCESS: {
           _ticketsList.push(action.item);
           AppStore.emitChange();
           break;
       }
       case AppConstants.ADD_TICKET_FAIL: {
           break;
       }
       case AppConstants.ADD_COMMENT_SUCCESS: {
           break;
       }
       case AppConstants.ADD_COMMENT_FAIL: {
           break;
       }
       case AppConstants.GET_TICKET_COMMENTS_SUCCESS: {
           break;
       }
       case AppConstants.GET_TICKET_COMMENTS_FAIL: {
           break;
       }
       case AppConstants.CHANGE_TICKET_STATE_SUCCESS: {
           break;
       }
       case AppConstants.CHANGE_TICKET_STATE_FAIL: {
           break;
       }
       case AppConstants.CLOSE_TICKET_SUCCESS: {
           let ticket = action.item;
           console.log(ticket);
           _ticketsList.find(x => x.id === ticket.id).state = ticket.state;
           AppStore.emitChange();
           break;
       }
       case AppConstants.CLOSE_TICKET_FAIL: {

           break;
       }
       default: {
       }
   }
});
export default AppStore;
