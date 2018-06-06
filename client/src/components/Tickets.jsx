import React from 'react';
import createClass from'create-react-class';
import TicketsTicket from './TicketsTicket.jsx';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const Tickets = createClass({
    getInitialState: function() {
        return {
            tickets: CronosInterfaces,
            showDialog: false,
            descriptionId: undefined
        };
    },
    handleEditOpen: function(elementId){
        console.log(elementId);
        this.setState({
            showDialog: true,
            descriptionId: elementId
        });
    },
    handleChange: function(event){
        // console.log(event.target.value);
        let interfaces = this.state.interfaces;
        interfaces[this.state.descriptionId].description = event.target.value;
        this.setState({
            interfaces: interfaces
        })
    },
    handleEditClose: function(){
        this.setState({
            showDialog: false,
            descriptionId: undefined
        });
    },
    render: function() {
        // console.log(this.context.router);
        const self = this;
        let description = '';
        if(this.state.descriptionId !== undefined){
            description = this.state.interfaces[this.state.descriptionId].description;
        }
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="subheading" color="inherit">
                            Сетевые интерфейсы
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {
                        this.state.tickets.map(function(el){
                            return <TicketsTicket key={el._id} interface={el} handleEditOpen={self.handleEditOpen} />;
                        })
                    }
                </List>
                <Dialog
                    open={this.state.showDialog}
                    onClose={this.handleEditClose}
                    aria-labelledby="form-dialog-description"
                >
                    <DialogTitle id="form-dialog-description">Добавить тикет</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={description}
                            margin="dense"
                            multiline=true
                            id="description"
                            label="Подпись"
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleEditClose} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
});

export default Tickets;