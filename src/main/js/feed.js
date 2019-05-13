import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
import * as blobUtil from 'blob-util'

const apiBaseUrl = "http://localhost:8080/";

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
    }
});


class DiaryEntry extends React.Component {

    constructor(props) {
        super(props);
        var diariesScreen = [];
        var commentsScreen = [];
        var newEntryScreen = [];
        this.state = {
            diariesScreen: diariesScreen,
            commentsScreen: commentsScreen,
            user_name: "",
            newEntryScreen: newEntryScreen
        };
        this.getEntries();
    }

    componentDidMount() {
        this.setNewEntryScreen();
    }

    getEntries() {
        const {classes} = this.props;
        var body = "";
        var media = "";
        var time_stamp = "";
        var title = "";
        var user_name = "";
        var visibility = "";
        var loc_id = "";
        var entryId = "";
        this.getName();
        axios.get(apiBaseUrl + 'getAllDiaryEntries')
            .then(async (res) => {
                for (var i = 0; i < res.data.length; i++) {
                    body = res.data[i]["body"];
                    media = res.data[i]["media"];
                    if (media === null) {
                        // media = new File([media], "mediaFile" + i);
                        // media = URL.createObjectURL(media);
                        media = "./asd.jpg"
                    }
                    time_stamp = res.data[i]["time_stamp"];
                    title = res.data[i]["title"];
                    user_name = res.data[i]["user_name"];
                    visibility = res.data[i]["visibility"];
                    loc_id = res.data[i]["loc_id"];
                    entryId = res.data[i]["entryId"];
                    await this.getComments(entryId);
                    await this.getLikes(entryId);
                    this.setState({
                        diariesScreen: this.state.diariesScreen.concat([<div><Card className={classes.card}>
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
                            <CardMedia
                                className={classes.media}
                                image={media}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography component="p">
                                    {body}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon/>
                                    <p>{this.state.entryLikes}</p>
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon/>
                                </IconButton>
                            </CardActions>
                            {this.state.commentsScreen}
                            <TextField
                                // id="outlined-name"
                                label="New Comment"
                                className={classes.textField}
                                value={this.state[entryId]}
                                onChange={this.handleChange(entryId)}
                                margin="normal"
                                variant="outlined"
                            />
                            <Button variant="contained" color="primary"
                                    onClick={this.commentClick(entryId)}>Add</Button>
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

    commentClick = (entry_id) => (e) => {
        var body = this.state[entry_id];
        console.log(body);
        axios.post(apiBaseUrl + 'newDiaryComment', {
            entry_id: entry_id,
            user_name: this.state.user_name,
            time_stamp: Date.now(),
            body: body
        })
            .then(function (response) {
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

    async getComments(diaryID) {
        await axios.get(apiBaseUrl + 'getDiaryComments?entryID=' + diaryID).then(res => {
            var comments = [];
            var commentBody;
            var commentTimestamp;
            var commentUsername;
            for (var i = 0; i < res.data.length; i++) {
                commentBody = res.data[i]["body"];
                commentTimestamp = res.data[i]["time_stamp"];
                commentUsername = res.data[i]["user_name"];
                comments.push(<div>
                    {commentUsername}: {commentBody}<br/>
                </div>)
            }
            this.setState({
                commentsScreen: comments
            });
        });
    };

    async getLikes(diaryID) {
        await axios.get(apiBaseUrl + 'getDiaryLikes?entryID=' + diaryID).then(res => {
            if (res.data)
                this.setState({
                    entryLikes: res.data
                });
            else
                this.setState({
                    entryLikes: 0
                });
        });
        console.log("done");
    };

    newPostClick = (e) => {
        console.log(this.state.selectedFile);
        let config = {
            header: {
                'Content-Type': 'multipart/form-data'
            }
        };
        var data = new FormData();
        data.append('user_name', this.state.user_name);
        data.append('title', this.state.newTitle);
        data.append('time_stamp', Date.now());
        data.append('body', this.state.newBody);
        data.append('visibility', this.state.visibility);
        data.append('media', this.state.selectedFile);
        data.append('file', 'image');
        axios.post(apiBaseUrl + 'newDiaryEntry', data, config
        )
        // axios.post(apiBaseUrl + 'newDiaryEntry', {
        //     user_name: this.state.user_name,
        //     title: this.state.newTitle,
        //     time_stamp: Date.now(),
        //     body: this.state.newBody,
        //     visibility: this.state.visibility,
        //     media: this.state.selectedFile
        // })
            .then(function (response) {
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

    setNewEntryScreen() {
        const {classes} = this.props;
        this.setState({
            newEntryScreen:
                this.state.newEntryScreen.concat([<div>
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
                        label="Body"
                        className={classes.textField}
                        value={this.state.newBody}
                        onChange={this.handleChange("newBody")}
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
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                            this.fileChangedHandler(e)
                        }}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button}>
                            Upload
                        </Button>
                    </label>
                    <Button variant="contained" color="primary"
                            onClick={() => {
                                this.newPostClick()
                            }}>Create</Button>
                </div>])
        });
    }

    fileChangedHandler = (mainEvent) => {
        console.log("called");
        var reader = new FileReader();
        reader.onload = (event) => {
            blobUtil.imgSrcToBlob(event.target.result).then((blob) => {
                    this.setState({selectedFile: blob});
                }
            ).catch(function (err) {
                console.log("Failed to load image" + err);
            });
        };
        reader.readAsDataURL(mainEvent.target.files[0]);
    };


    render() {
        return (
            <div>
                <div>
                    {this.state.newEntryScreen}
                </div>
                <div>
                    {this.state.diariesScreen}
                </div>
            </div>
        );
    }
}

DiaryEntry
    .propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)

(
    DiaryEntry
)
;