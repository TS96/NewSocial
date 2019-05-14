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
    },
    textField: {
        marginLeft: 5,
        marginRight: 5,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200
    }
};

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datePick: new Date(),
            registerScreen: []
        };
    }

    componentDidMount() {
        const {classes} = this.props;
        const style = {
            margin: 15,
        };
        const theme = createMuiTheme();
        this.setState( {
            registerScreen: [<div>
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
                            <TextField
                                // id="outlined-name"
                                label="username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange("username")}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                // id="outlined-name"
                                label="first_name"
                                className={classes.textField}
                                value={this.state.first_name}
                                onChange={this.handleChange("first_name")}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                // id="outlined-name"
                                label="last_name"
                                className={classes.textField}
                                value={this.state.last_name}
                                onChange={this.handleChange("last_name")}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                // id="outlined-name"
                                label="email"
                                className={classes.textField}
                                value={this.state.email}
                                onChange={this.handleChange("email")}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                // id="outlined-name"
                                label="city"
                                className={classes.textField}
                                value={this.state.city}
                                onChange={this.handleChange("city")}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                // id="outlined-name"
                                label="country"
                                className={classes.textField}
                                value={this.state.country}
                                onChange={this.handleChange("country")}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                // id="outlined-name"
                                label="password"
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange("password")}
                                margin="normal"
                                variant="outlined"
                                type="password"
                            />
                            <DatePicker
                                name="dob"
                                selected={this.state.datePick}
                                onChange={(date) => this.setState({datePick: date})}
                            />
                            <br/><br/><br/>
                            <Button variant="contained" color="primary"
                                    onClick={() => {
                                        this.handleClick()
                                    }}>Register</Button>
                    </div>
                    <div>Already registered? Login!
                        <div>
                            <Button variant="contained" color="primary" style={style}
                                    onClick={(event) => this.handleLoginClick(event)}>Login</Button>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>]
        });
        this.render();
    }


    handleLoginClick(event) {
        window.location = "/login"
    }

    handleChange = name => event => {
        console.log(name);
        this.setState({
            [name]: event.target.value,
        });
        console.log(this.state[name]);
    };


    handleClick(event) {
        var apiBaseUrl = "http://localhost:8080/";
        console.log(this.state.password);
        axios.post(apiBaseUrl + 'register', {
            username: this.state.username,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
            dob: this.state.datePick,
            city: this.state.city,
            country: this.state.country,

        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200 || response.status === 202) {
                    console.log(response.status);
                    window.location = "/login"
                } else {
                    alert("An error occurred");
                    console.log("some error occurred", response.status);
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