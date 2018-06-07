import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from "@material-ui/core/es/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText";
import List from "@material-ui/core/es/List";
import AppStore from '../stores/AppStore';
import AppActions from "../actions/AppActions";
import Divider from "@material-ui/core/es/Divider/Divider";
import IconBack from "@material-ui/icons/ArrowBack";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import IconPlus from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import TextField from "@material-ui/core/es/TextField/TextField";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/es/Button/Button";

import './Ticket.css';

const Ticket = createClass({
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    getInitialState: function(){
        return {
            id: parseInt(this.context.router.route.match.params.ticketId),
            comments: AppStore.getTicketCommentsList(),
            ticket: AppStore.getTicket(),
            showDialog: false,
        };
    },
    componentWillMount() {
        AppActions.getTicket({id:this.state.id});
        AppActions.getTicketComments({id:this.state.id})
    },

    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    },
    openDialog(){
        this.setState({
            showDialog: true
        });
    },
    closeDialog(){
        this.setState({
            showDialog: false
        });
    },

    handleCloseDialog(){
        this.closeDialog();
    },

    handleSaveDialog(event){
        AppActions.addTicketComment({
            ticket_id: this.state.id,
            email: this.email.value,
            message: this.message.value,
        });
        this.closeDialog();
    },
    nextState(){
        AppActions.changeTicketState({id: this.state.id});
    },
    goBack(){
        this.context.router.history.push('/');
    },
    render: function() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton className="back-button" label="Назад" color="inherit" aria-label="К списку тикетов" onClick={this.goBack}>
                            <IconBack />
                        </IconButton>
                        <Typography variant="subheading" color="inherit">
                            Тикет № {this.state.id} ({this.state.ticket.state_str})
                        </Typography>
                        { this.state.ticket.state !== 8 &&
                            <ListItemSecondaryAction>
                                <Button label="Статус" className="next-state-button" color="inherit"
                                        aria-label="Изменить статус" onClick={this.nextState}>
                                    Изменить статус тикета
                                </Button>
                            </ListItemSecondaryAction>
                        }
                    </Toolbar>
                </AppBar>
                <div className="ticket">
                    <div className="ticket--email"><span className="label">От:</span> {this.state.ticket.email}</div>
                    <div className="ticket--subject"><span className="label">Тема:</span> {this.state.ticket.subject}</div>
                    <div className="ticket--label"><span className="label">Сообщение:</span></div>
                    <div className="ticket--message">{this.state.ticket.message}</div>
                    <div className="ticket--created_at"><span className="label">Дата:</span> {this.state.ticket.created_at}</div>
                </div>
                <Divider/>
                <List className="ticket-comments">
                    <ListItem>
                        <ListItemText className="ticket-comments-item--header" primary="Комментарии"/>
                        <ListItemSecondaryAction>
                            <IconButton className="add-comment-button" color="inherit" aria-label="Добавить комментарий" onClick={this.openDialog}>
                                <IconPlus />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    {
                        this.state.comments.map(function(comment){
                            return (
                                <ListItem className="ticket-comments-item" key={comment.id}>
                                    <div className="ticket-comments-item--email"><span className="label">От:</span> {comment.email}</div>
                                    <div className="ticket-comments-item--label"><span className="label">Сообщение:</span></div>
                                    <div className="ticket-comments-item--message">{comment.message}</div>
                                    <div className="ticket-comments-item--created_at"><span className="label">Дата:</span> {comment.created_at}</div>
                                </ListItem>
                            );
                        })
                    }
                </List>
                <Dialog
                    open={this.state.showDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-add_address"
                >
                    <DialogTitle id="form-dialog-add_address">Добавить комментарий к тикету</DialogTitle>
                    <DialogContent>
                        <div>
                            <TextField
                                id="message"
                                label="Сообщение"
                                margin="normal"
                                multiline
                                inputRef={input => this.message = input}
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                id="email"
                                type="email"
                                label="Email"
                                margin="normal"
                                inputRef={input => this.email = input}
                                fullWidth
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
            ticket: AppStore.getTicket(),
            comments: AppStore.getTicketCommentsList(),
        });
    }
});

export default Ticket;