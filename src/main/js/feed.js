import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";

const apiBaseUrl = "http://localhost:8080/";

const styles = theme => ({
    card: {
        maxWidth: 400,
        center: true,
        alignItems: 'center',
        justifyContent: 'center'
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
});


class DiaryEntry extends React.Component {
    state = {expanded: false};

    constructor(props) {
        super(props);
        var diariesScreen = [];
        var commentsScreen = [];
        this.state = {
            diariesScreen: diariesScreen,
            commentsScreen: commentsScreen
        };
        this.getEntries()
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
                    console.log("about to enter");
                    await this.getComments(entryId);
                    console.log("left");
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
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon/>
                                </IconButton>
                            </CardActions>
                            {this.state.commentsScreen}
                        </Card><br/></div>])
                    });
                }
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
        console.log("done");
    };

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        return (
            <div>
                {this.state.diariesScreen}
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