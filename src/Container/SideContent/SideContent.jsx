import { React} from 'react';
import { Typography, Grid, CardContent, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#afafaf',
        color: 'rgb(55 71 79);'
    },
}));

export default function SideContent({ title, mainValue, subValue }) {
    const classes = useStyles();
    console.log(subValue);
    return (
        <Grid item xs={12}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="h2">
                        <p>{mainValue}</p>
                    </Typography>
                    {subValue.map(value => <Typography key = {value}>{value}</Typography>)}
                </CardContent>
            </Card>
        </Grid>
    )
}
