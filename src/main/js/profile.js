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
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);
        var location = window.location.href;
        var pageUser = location.substr(location.indexOf("-") + 1);
        var username = "";
        var first_name = "";
        var last_name = "";
        var email = "";
        var dob = "";
        var city = "";
        var country = "";
        this.state = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            dob: dob,
            city: city,
            country: country,
            profileScreen: profileScreen,
            friendshipScreen: friendshipScreen,
            pageUser: pageUser
        };
        this.retrieveUserInfo();
        this.setFriendships();
    }

    async setFriendships() {
        await this.getName();
        if (this.state.currentUser !== this.state.pageUser) {
            await axios.get(apiBaseUrl + 'getFriendship?username=' + this.state.pageUser)
                .then(res => {
                    console.log(res);
                    if (res.data === null || res.data === "") {
                        this.setState({status: "nothing"});
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
            this.setState({status: "false"});
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
                profileScreen.push(this.getProfile());
                this.setState({profileScreen: profileScreen});
                this.render();
            });
    }

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
                <p>
                    Username: {this.state.username}
                </p>
                <p>
                    Email: {this.state.email}
                </p>
                <p>
                    First Name: {this.state.first_name}
                </p>
                <p>
                    Last Name: {this.state.last_name}
                </p>
                <p>
                    Date of Birth: {this.state.dob}
                </p>
                <p>
                    City: {this.state.city}
                </p>
                <p>
                    Country: {this.state.country}
                </p>
            </div>
        );
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