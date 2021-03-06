import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        const {classes} = this.props;
        var registerScreen = [];
        var startDate = new Date();
        const style = {
            margin: 15,
        };
        const theme = createMuiTheme();
        registerScreen.push(<div>
            <MuiThemeProvider theme={theme}>
                <div>
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.grow}>
                                    Registration
                                </Typography>
                                <Button color="inherit">Login</Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <form onSubmit={(event) => this.handleClick(event)}>
                        <TextField
                            name="username"
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                        />
                        <br/>
                        <TextField
                            name="first_name"
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                        />
                        <br/>
                        <TextField
                            name="last_name"
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                        />
                        <br/>
                        <TextField
                            name="email"
                            hintText="Enter your email"
                            floatingLabelText="Email"
                        />
                        <br/>
                        <TextField
                            name="city"
                            hintText="Enter your city"
                            floatingLabelText="City"
                        />
                        <br/>
                        <TextField
                            name="country"
                            hintText="Enter your country"
                            floatingLabelText="Country"
                        />
                        <br/>
                        <TextField
                            name="password"
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                        />
                        <br/>
                        <DatePicker
                            name="dob"
                            selected={startDate}
                            onChange={(date) => startDate = date}
                        />
                        <br/>
                        <Button variant="contained" color="primary" style={style}>Submit</Button>
                    </form>
                </div>
                <div>Already registered? Login!
                    <div>
                        <Button variant="contained" color="primary" style={style}
                                onClick={(event) => this.handleLoginClick(event)}>Login</Button>
                    </div>
                </div>
            </MuiThemeProvider>
        </div>);
        this.state = {registerScreen: registerScreen}
    }


    handleLoginClick(event) {
        window.location = "/login"
    }


    handleClick(event) {
        event.preventDefault();
        var apiBaseUrl = "http://localhost:8080/";
        var self = this;
        const data = new FormData(event.target);
        axios.post(apiBaseUrl + 'register', data)
            .then(function (response) {
                console.log(response);
                if (response.status === 200 || response.status === 202) {
                    console.log(response.status);
                    window.location = "/login"
                } else {
                    alert("An error occurred");
                    console.log("some error ocurred", response.status);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {this.state.registerScreen}
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);