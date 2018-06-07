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
       }
       case AppConstants.GET_TICKETS_FAIL: {
           _ticketsList = [];
           _error = action.error;
           AppStore.emitChange();
       }
       case AppConstants.GET_TICKET_SUCCESS: {}
       case AppConstants.GET_TICKET_FAIL: {}
       case AppConstants.ADD_TICKET_SUCCESS: {}
       case AppConstants.ADD_TICKET_FAIL: {}
       case AppConstants.ADD_COMMENT_SUCCESS: {}
       case AppConstants.ADD_COMMENT_FAIL: {}
       case AppConstants.GET_TICKET_COMMENTS_SUCCESS: {}
       case AppConstants.GET_TICKET_COMMENTS_FAIL: {}
       case AppConstants.CHANGE_TICKET_STATE_SUCCESS: {}
       case AppConstants.CHANGE_TICKET_STATE_FAIL: {}
       case AppConstants.CLOSE_TICKET_SUCCESS: {}
       case AppConstants.CLOSE_TICKET_FAIL: {}
       default: {
       }
   }
});
export default AppStore;
