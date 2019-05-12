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
        this.state = {diariesScreen: diariesScreen};
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
            .then(res => {
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
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </CardActions>
                            <p>test</p>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside
                                        for 10
                                        minutes.
                                    </Typography>
                                    <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                        medium-high
                                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until
                                        lightly
                                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                                        onion,
                                        salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                        minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                                        boil.
                                    </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and peppers,
                                        and cook
                                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce
                                        heat
                                        to medium-low, add reserved shrimp and mussels, tucking them down into the rice,
                                        and
                                        cook again without stirring, until mussels have opened and rice is just tender,
                                        5 to 7
                                        minutes more. (Discard any mussels that don’t open.)
                                    </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                            <p>test</p>
                        </Card><br/></div>])
                    })
                }
            });
    }

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