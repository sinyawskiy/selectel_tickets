import React from 'react';
import createClass from'create-react-class';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import ListItem from "@material-ui/core/es/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText";
import List from "@material-ui/core/es/List";
import AppBar from '@material-ui/core/AppBar';
import './Tickets.css';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Typography from "@material-ui/core/es/Typography/Typography";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import IconPlus from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import CloseIcon from '@material-ui/icons/Close';


const Tickets = createClass({
    getInitialState: function() {
        return {
            tickets: AppStore.getTicketsList(),
            showDialog: false,
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

    openTicket(id){
        console.log(id);
    },

    openDialog(){
        this.setState({
           showDialog: true
        });
    },

    getTicketsByState(state){
        let self = this;
        return this.state.tickets.map(function(ticket){
            if(ticket.state === state){
                let title = `${ticket.id}. ${ticket.subject}`;
                return (
                    <ListItem button key={ticket.id} onClick={self.openTicket.bind(null, ticket.id)}>
                        <ListItemText
                            primary={title}
                            secondary={ticket.created_at}
                        />
                        <ListItemSecondaryAction>
                            <IconButton aria-label='Закрыть тикет' onClick={self.handleCloseTicket.bind(null, ticket.id)}>
                                <CloseIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }
        });
    },

    handleCloseDialog(){
        this.closeDialog();
    },

    closeDialog(){
        this.setState({
            showDialog: false
        });
    },

    handleSaveDialog(event){
        AppActions.addTicket({
            email: this.email.value,
            message: this.message.value,
            subject: this.subject.value
        });
        this.closeDialog();
    },

    handleCloseTicket(id){
        AppActions.closeTicket({id});
    },

    render: function() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="subheading" color="inherit">
                            Список тикетов
                        </Typography>
                        <IconButton className="add-ticket-button" color="inherit" aria-label="Создать тикет" onClick={this.openDialog}>
                            <IconPlus />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className="tickets-row">
                    <List className="tickets-column tickets-column--state-1">
                        <ListItem>
                            <ListItemText className="tickets-column-item--header" primary="Открыт"/>
                        </ListItem>
                        {
                            this.getTicketsByState(1)
                        }
                    </List>
                    <List className="tickets-column tickets-column--state-2">
                        <ListItem >
                            <ListItemText className="tickets-column-item--header" primary="Отвечен"/>
                        </ListItem>
                        {
                            this.getTicketsByState(2)
                        }
                    </List>
                    <List className="tickets-column tickets-column--state-4">
                        <ListItem >
                            <ListItemText className="tickets-column-item--header" primary="Ожидает ответ"/>
                        </ListItem>
                        {
                            this.getTicketsByState(4)
                        }
                    </List>
                    <List className="tickets-column tickets-column--state-8">
                        <ListItem >
                            <ListItemText className="tickets-column-item--header" primary="Закрыт"/>
                        </ListItem>
                        {
                            this.getTicketsByState(8)
                        }
                    </List>
                </div>
                <Dialog
                    open={this.state.showDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-add_address"
                >
                    <DialogTitle id="form-dialog-add_address">Создание нового тикета</DialogTitle>
                    <DialogContent>
                        <div>
                            <TextField
                                id="subject"
                                label="Тема сообщения"
                                margin="normal"
                                inputRef={input => this.subject = input}
                            />
                        </div>
                        <div>
                            <TextField
                                id="message"
                                label="Сообщение"
                                margin="normal"
                                multiline
                                inputRef={input => this.message = input}
                            />
                        </div>
                        <div>
                            <TextField
                                id="email"
                                type="email"
                                label="Email"
                                margin="normal"
                                inputRef={input => this.email = input}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleSaveDialog} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    },

    _onChange() {
        this.setState({
            tickets: AppStore.getTicketsList()
        });
    }
});

export default Tickets;