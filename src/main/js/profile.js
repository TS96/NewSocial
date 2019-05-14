import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


var apiBaseUrl = "http://localhost:8080/";
var profileScreen = [];
var friendshipScreen = [];

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
    }, container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 5,
        marginRight: 5,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);
        var location = window.location.href;
        var pageUser = location.substr(location.indexOf("-") + 1);
        this.state = {
            profileScreen: profileScreen,
            friendshipScreen: friendshipScreen,
            pageUser: pageUser
        };
        this.setState({profileScreen: this.getProfile()});
        this.retrieveUserInfo();
        this.setFriendships();
    }

    async setFriendships() {
        await this.getName();
        this.setState({isTheSame: false});
        if (this.state.currentUser !== this.state.pageUser) {
            await axios.get(apiBaseUrl + 'getFriendship?username=' + this.state.pageUser)
                .then(res => {
                    console.log(res);
                    if (res.data === null || res.data === "") {
                        friendshipScreen.push([<Button variant="contained" color="primary"
                                                       onClick={(e) => {
                                                           this.friendRequestClick()
                                                       }}>Send Friend Request</Button>]);
                    } else if (res.data["request_status"] === "pending") {
                        friendshipScreen.push([<Button variant="contained" color="primary"
                        >Request Sent</Button>]);
                    } else if (res.data["request_status"] === "rejected") {
                        friendshipScreen.push([<Button variant="contained" color="primary"
                        >Request Rejected</Button>]);
                    } else if (res.data["request_status"] === "approved") {
                        friendshipScreen.push([<Button variant="contained" color="primary"
                        >FRIENDS</Button>]);
                    }
                    this.setState({friendshipScreen: friendshipScreen});
                });
        } else {
            this.setState({isTheSame: true});
        }
    }

    friendRequestClick(event) {
        axios.post(apiBaseUrl + 'newFriendship', {
            friendName: this.state.pageUser,
            username: this.state.currentUser,
            request_status: "pending",
            time_stamp: new Date(),
            visibility: "friends"
        }).then(function (response) {
            console.log(response);
            if (response.status === 200 || response.status === 202) {
                console.log(response.status);
            } else {
                alert("An error occurred");
                console.log("some error ocurred", response.status);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    retrieveUserInfo() {
        axios.get(apiBaseUrl + 'getUser?username=' + this.state.pageUser)
            .then(res => {
                this.setState({
                    username: res.data["username"],
                    first_name: res.data["first_name"],
                    last_name: res.data["last_name"],
                    email: res.data["email"],
                    dob: res.data["dob"],
                    city: res.data["city"],
                    country: res.data["country"]
                });
                this.setState({profileScreen: this.getProfile()});
                this.render();
            });
    }

    handleChange = name => event => {
        console.log(name);
        this.setState({
            [name]: event.target.value,
        });
        console.log(this.state[name]);
    };

    getProfile() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                {this.state.username}'s Profile
                            </Typography>
                            <Button color="inherit">Home</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <Avatar>H</Avatar>
                <br/>
                <TextField
                    id="outlined-name"
                    label="Username"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="First Name"
                    className={classes.textField}
                    value={this.state.first_name}
                    onChange={this.handleChange('first_name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Last Name"
                    className={classes.textField}
                    value={this.state.last_name}
                    onChange={this.handleChange('last_name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Date of Birth"
                    className={classes.textField}
                    value={this.state.dob}
                    onChange={this.handleChange('dob')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="City"
                    className={classes.textField}
                    value={this.state.city}
                    onChange={this.handleChange('city')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-name"
                    label="Country"
                    className={classes.textField}
                    value={this.state.country}
                    onChange={this.handleChange('country')}
                    margin="normal"
                    variant="outlined"
                />
                <Button variant="contained" color="primary"
                        onClick={(event) => this.handleClick(event)}>Save</Button>
            </div>
        );
    }

    handleClick(event) {
        if (this.state.isTheSame === false) {
            alert("You're not the user!");
            return;
        }
        event.preventDefault();
        var apiBaseUrl = "http://localhost:8080/";
        axios.post(apiBaseUrl + 'updateUser', {
            username: this.state.username,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            city: this.state.city,
            country: this.state.country
        }).then(function (response) {
            console.log(response);
            if (response.status === 200 || response.status === 202) {
                console.log(response.status);
            } else {
                alert("An error occurred");
                console.log("some error ocurred", response.status);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    async getName() {
        await axios.get(apiBaseUrl + 'username')
            .then((res) => {
                this.setState({
                    currentUser: res.data
                });
            });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.profileScreen}
                </div>
                <div>
                    {this.state.friendshipScreen}
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);