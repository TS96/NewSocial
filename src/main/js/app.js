import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import Register from "./register";
import Profile from "./profile";
import DiaryEntry from "./feed";
import Activity from "./activities";

class App extends Component {
    constructor(props) {
        super(props);
        var registerPage = [];
        var profilePage = [];
        var homePage = [];
        var activitiesPage = [];
        var isProfilePage = false;
        var isHomePage = false;
        var isActivitiesPage = false;
        console.log(window.location.href);
        registerPage.push(<Register appContext={this}/>);
        profilePage.push(<Profile appContext={this}/>);
        homePage.push(<DiaryEntry appContext={this}/>);
        activitiesPage.push(<Activity appContext={this}/>);
        if (window.location.href.includes("user-"))
            isProfilePage = true;
        if (window.location.href.endsWith("/home"))
            isHomePage = true;
        if (window.location.href.endsWith("/activities"))
            isActivitiesPage = true;
        this.state = {
            registerPage: registerPage,
            profilePage: profilePage,
            isProfilePage: isProfilePage,
            homePage: homePage,
            isHomePage: isHomePage,
            isActivitiesPage: isActivitiesPage,
            activitiesPage: activitiesPage
        }
    }

    render() {
        console.log(this.state.isProfilePage);
        if (this.state.isProfilePage) {
            return (
                <div style={style}>
                    {this.state.profilePage}
                </div>
            );
        } else if (this.state.isHomePage)
            return (
                <div style={style}>
                    {this.state.homePage}
                </div>
            );
        else if (this.state.isActivitiesPage)
            return (<div style={style}>
                {this.state.activitiesPage}
            </div>);
        else
            return (
                <div style={style}>
                    {this.state.registerPage}
                </div>
            );
    }
}

const style = {
    textAlign: 'center',
};

export default App;

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);