import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GoogleMapReact from 'google-map-react';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const apiBaseUrl = "http://localhost:8080/";
const AnyReactComponent = ({text}) => (
    <div style={{
        color: 'white',
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);

const styles = theme => ({
    card: {
        maxWidth: 400,
        center: true,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    center: {
        lat: 40.68,
        lng: -73.98
    },
    zoom: 11,
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
});


class Activity extends React.Component {

    static defaultProps = {
        center: {
            lat: 40.66,
            lng: -73.98
        },
        zoom: 11
    };

    constructor(props) {
        super(props);
        const {classes} = this.props;
        var activitiesScreen = [];
        var newActivityScreen = [<div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Activities Feed
                    </Typography>
                    <Button color="inherit">My Profile</Button>
                </Toolbar>
            </AppBar>
        </div>];
        this.state = {
            activitiesScreen: activitiesScreen,
            user_name: "",
            newActivityScreen: newActivityScreen
        };
        this.getActivities();
    }

    componentDidMount() {
        this.setNewActivityScreen();
    }

    getActivities() {
        const {classes} = this.props;
        var time_stamp = "";
        var title = "";
        var user_name = "";
        var visibility = "";
        var loc_id = "";
        var activityId = "";
        this.getName();
        axios.get(apiBaseUrl + 'getAllActivities')
            .then(async (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    time_stamp = res.data[i]["time_stamp"];
                    title = res.data[i]["title"];
                    user_name = res.data[i]["user_name"];
                    visibility = res.data[i]["visibility"];
                    loc_id = res.data[i]["loc_id"];
                    activityId = res.data[i]["activityID"];
                    await this.getLikes(activityId);
                    await this.getLocation(loc_id);
                    console.log(this.state.activityLat);
                    console.log(this.state.activityLong);
                    this.setState({
                        activitiesScreen: this.state.activitiesScreen.concat([<div><Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        {user_name}
                                    </Avatar>
                                }
                                action={
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={title}
                                subheader={time_stamp}
                            />
                            <div style={{height: '50vh', width: '100%'}}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{key: "AIzaSyAQeHqAYX1RxO46PksnMDtvMa2Y4Ivbqgs"}}
                                    defaultCenter={this.props.center}
                                    defaultZoom={this.props.zoom}
                                >
                                    <AnyReactComponent
                                        lat={this.state.activityLat}
                                        lng={this.state.activityLong}
                                        text={this.state.activityName}
                                    />
                                </GoogleMapReact>
                            </div>
                            <CardContent>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites" onClick={this.activityLike(activityId)}>
                                    <FavoriteIcon/>
                                    <p>{this.state.activityLikes}</p>
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon/>
                                </IconButton>
                            </CardActions>
                        </Card><br/></div>])
                    });
                }
            });
    }

    handleChange = name => event => {
        console.log(name);
        this.setState({
            [name]: event.target.value,
        });
        console.log(this.state[name]);
    };

    activityLike = (activityId) => (e) => {
        axios.post(apiBaseUrl + 'newActivityLike', {
            acID: activityId,
            username: this.state.user_name,
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
    };

    getName() {
        axios.get(apiBaseUrl + 'username')
            .then(res => {
                this.setState({
                    user_name: res.data
                });
            });
    }

    async getLikes(activityId) {
        await axios.get(apiBaseUrl + 'getActivityLikes?acID=' + activityId).then(res => {
            if (res.data)
                this.setState({
                    activityLikes: res.data
                });
            else
                this.setState({
                    activityLikes: 0
                });
        });
    };

    async getLocation(loc_id) {
        await axios.get(apiBaseUrl + 'getLocation?locationID=' + loc_id).then(res => {
            if (res.data)
                this.setState({
                    activityLong: parseFloat(res.data["lon"]),
                    activityLat: parseFloat(res.data["lat"]),
                    activityName: res.data["name"]
                });
        });
        console.log("done");
    };

    newPostClick = (e) => {
        axios.post(apiBaseUrl + 'newLocation', {
            name: this.state.newLocation,
            lat: this.state.newLatitude,
            lon: this.state.newLongitude,
        }).then(async (response) => {
            console.log(response);
            if (response.status === 200 || response.status === 202) {
                await axios.get(apiBaseUrl + 'getLocationByName?name=' + this.state.newLocation)
                    .then(async (res) => {
                        console.log(res);
                        this.setState({newLocationID: res.data["locationID"]});
                        await axios.post(apiBaseUrl + 'newActivity', {
                            user_name: this.state.user_name,
                            title: this.state.newTitle,
                            time_stamp: Date.now(),
                            loc_id: parseInt(this.state.newLocationID),
                            visibility: this.state.visibility,
                        });
                    });
            } else {
                alert("An error occurred");
                console.log("some error ocurred", response.status);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    };

    setNewActivityScreen() {
        const {classes} = this.props;
        this.setState({
            newActivityScreen:
                this.state.newActivityScreen.concat([<div>
                    <TextField
                        // id="outlined-name"
                        label="Title"
                        className={classes.textField}
                        value={this.state.newTitle}
                        onChange={this.handleChange("newTitle")}
                        margin="normal"
                        variant="outlined"
                    />
                    <br/>
                    <TextField
                        // id="outlined-name"
                        label="Location Name"
                        className={classes.textField}
                        value={this.state.newLocation}
                        onChange={this.handleChange("newLocation")}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        // id="outlined-name"
                        label="Latitude"
                        className={classes.textField}
                        value={this.state.newLatitude}
                        onChange={this.handleChange("newLatitude")}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        // id="outlined-name"
                        label="Longitude"
                        className={classes.textField}
                        value={this.state.newLongitude}
                        onChange={this.handleChange("newLongitude")}
                        margin="normal"
                        variant="outlined"
                    />
                    <br/>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                            Visibility
                        </InputLabel>
                        <Select
                            value={this.state.visibility}
                            onChange={this.handleChange("visibility")}
                            input={<Input name="age" id="age-label-placeholder"/>}
                            name="visibility"
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="friends">Friends</MenuItem>
                            <MenuItem value="fof">Friends of Friends</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <Button variant="contained" color="primary"
                            onClick={() => {
                                this.newPostClick()
                            }}>Create</Button>
                </div>])
        });
    }


    render() {
        return (
            <div>
                <div>
                    {this.state.newActivityScreen}
                </div>
                <div>
                    {this.state.activitiesScreen}
                </div>
            </div>
        );
    }
}

Activity
    .propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)

(
    Activity
)
;