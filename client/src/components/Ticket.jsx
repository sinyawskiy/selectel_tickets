import React from 'react';
import createClass from 'create-react-class';
import CronosInterfaces from './interfaces.json';
import PropTypes from 'prop-types';
import PageEdit_IPv4List from './PageEdit_IPv4List.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GreenSwitch from './GreenSwitch.jsx';
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import List from "@material-ui/core/es/List/List";

const Ticket = createClass({
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    getInitialState: function(){
        let cronos_interface;
        const cronos_interfaceId=parseInt(this.context.router.route.match.params.interfaceId);
        for(const i in CronosInterfaces) {
            if (CronosInterfaces[i]._id == cronos_interfaceId) {
                cronos_interface = CronosInterfaces[i];
                break;
            }
        }
        return cronos_interface;
    },
    handleToggle: function(event){
        this.setState({
            dhcp: event.target.checked?'Получение IP адреса...':false
        })
    },
    render: function(){
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="subheading" color="inherit">
                            Настройка интерфейса «{this.state.title}»
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                        <ListItemText
                            primary='DHCP'
                            secondary={this.state.dhcp?this.state.dhcp:''}
                        />
                        <ListItemSecondaryAction>
                            <GreenSwitch
                                onChange={this.handleToggle}
                                checked={this.state.dhcp!=false}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <PageEdit_IPv4List interface={this.state}/>
            </div>
        );
    }
});

export default Ticket;