import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';


var apiBaseUrl = "http://localhost:8080/";
var profileScreen = [];

class Profile extends Component {
    constructor(props) {
        super(props);
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
            profileScreen: profileScreen
        };
        this.retrieveUserInfo();
    }


    render() {
        return (
            <div>
                {this.state.profileScreen}
            </div>
        );
    }

    retrieveUserInfo() {
        var location = window.location.href;
        var username = location.substr(location.indexOf("-") + 1);
        axios.get(apiBaseUrl + 'getUser?username=' + username)
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
                this.setState({profileScreen:profileScreen});
                this.render();
            });
    }

    getProfile() {
        // axios.get(apiBaseUrl + 'username')
        //     .then(res => {
        //         username = res.data;
        //     });
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
}


export default Profile;