import { React, useState } from 'react';
import { Typography, Grid, CardContent, Card, CardActions, IconButton, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import {CircularProgressbar , buildStyles} from 'react-circular-progressbar'
import AnimatedProgressProvider from '../AnimatedProgressProvider'
import { easeQuadInOut } from "d3-ease";
import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#7d7d7d5c',
        color: 'rgb(207 213 255)',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    actions: {
        float: 'right'
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
                    
                    <Typography variant="h6" style={{ color: "white" }} gutterBottom>
                        {title}
                    </Typography>
                    { mainValue.length > 3 && 
                        <div style={{ width: "100%", display: 'flex',flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', gap : 10 }}>
                            <Typography variant="h5" style = {{alignSelf : 'flex-start'}}>
                                {mainValue.split(' : ')[0]}

                            </Typography>
                            <div style={{ width: 120 }}>
                                <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={mainValue.split(' : ')[1].split('%')[0] * 1}
                                    duration={1}
                                    easingFunction={easeQuadInOut}
                                >
                                    {(value) => {
                                        return (
                                            <CircularProgressbar
                                                value={value}
                                                text={`${value.toFixed(1)}%`}
                                                strokeWidth={3}
                                                styles={buildStyles({
                                                    textColor: "rgb(207 213 255)",
                                                    pathColor: "rgb(207 213 255)",
                                                    trailColor: "gray"
                                                })}
                                            />
                                        );
                                    }}
                                </AnimatedProgressProvider>

                            </div>
                        </div>
}
                </CardContent>
                <Collapse in={expanded}>
                    <CardContent className={classes.content} style = {{paddingBottom : 0}}>
                        {subValue.map(value => <div style={{ marginBottom : 10, width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" key={value}>
                                {value.split(' : ')[0]}

                            </Typography>
                            <div style={{ width: 60 }}>
                                <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={value.split(' : ')[1].split('%')[0] * 1}
                                    duration={1}
                                    easingFunction={easeQuadInOut}
                                >
                                    {(val) => {
                                        return (
                                            <CircularProgressbar
                                                value={val}
                                                text={`${val.toFixed(1)}%`}
                                                strokeWidth={3}
                                                styles={buildStyles({
                                                    textColor: "rgb(207 213 255)",
                                                    pathColor: "rgb(207 213 255)",
                                                    trailColor: "gray"
                                                })}
                                            />
                                        );
                                    }}
                                </AnimatedProgressProvider>

                            </div>
                        </div>)}
                    </CardContent>
                </Collapse>
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
                
            </Card>
        </Grid>
    )
}
