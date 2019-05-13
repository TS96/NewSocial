import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Button from '@material-ui/core/Button';


var apiBaseUrl = "http://localhost:8080/";
var profileScreen = [];
var friendshipScreen = [];

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
                    if (res.data === null || res.data === "") {
                        console.log("got it");
                        this.setState({status: "nothing"});
                        friendshipScreen.push([<Button variant="contained" color="primary"
                                                       onClick={(e) => {
                                                           this.friendRequestClick()
                                                       }}>Send Friend Request</Button>]);
                        this.setState({friendshipScreen: friendshipScreen});
                    }
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
        return (
            <div>
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


export default Profile;