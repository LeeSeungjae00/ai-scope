import { React, useState } from 'react';
import { Typography, Grid, CardContent, Card, CardActions, IconButton, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#7d7d7d5c',
        color: 'rgb(207 213 255)',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    actions : {
        float : 'right'
    }
}));

export default function SideContent({ title, mainValue, subValue }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = (e) => {
        e.preventDefault();
        setExpanded(!expanded);
    };

    return (
        <Grid item xs={12}>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography variant="h6" style = {{color : "white"}} gutterBottom>
                        {title}
                    </Typography>
                    <Typography  variant="h5">
                        {mainValue}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <IconButton
                        size="small"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <ExpandMore></ExpandMore>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded}>
                    <CardContent>
                        {subValue.map(value => <Typography variant="body2" key={value}>{value}</Typography>)}
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}
