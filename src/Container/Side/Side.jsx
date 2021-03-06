import './Side.css'
import { React, useRef } from 'react';
import { Grid, ButtonGroup, Button, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideContent from '../SideContent/SideContent';
import { SendOutlined, FolderOpenOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    buttonArray: {
        width: '100%'
    },
    button: {
        flex: 1,
        color: '#c7c7c7',
        borderColor: '#c7c7c7'
    },
    icon: {
        marginRight: "3px",
        width: "0.7em"
    },
    buttonProgress: {
        color: "#fff",
        marginTop: -5,
        marginLeft: -12,
    },
    mainProgress: {
        alignSelf: "center"
    },
    root: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        }
    },
    radioGroup: {
        justifyContent: "center",
        color: "white"
    },
    radioLableRoot: {
        backgroundColor: ""
    }
}));







export default function Side({ onChangeFile, onFileButtonClick, onSendFile, sideContentArray, fileProps }) {
    const fileRef = useRef();
    const classes = useStyles();


    return (
        <aside className="side">
            <input {...fileProps} ref={fileRef} hidden={true} id="file" type='file' onChange={onChangeFile}></input>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                            <ButtonGroup
                                className={classes.buttonArray}
                                variant="text" size="small"
                                aria-label="text primary button group">
                                <Button className={classes.button} onClick={(e) => {
                                    onFileButtonClick(e, fileRef);
                                }}>
                                    <FolderOpenOutlined className={classes.icon}></FolderOpenOutlined>Select File
                                </Button>
                                <Button className={classes.button} onClick={(e) => {
                                    onSendFile(e);
                                }}>
                                    <><SendOutlined className={classes.icon} ></SendOutlined>Result</>
                                </Button>
                            </ButtonGroup>
                    <hr></hr>
                </Grid>
                <div className="loading-rapping">
                    <div className="result-rapper">
                        <SideContent
                            key={"Differential diagnosis"}
                            title={"Differential diagnosis"}
                            mainValue={
                                sideContentArray[0]?.mainValue ?
                                    sideContentArray[0].mainValue :
                                    <>&nbsp;</>}
                            subValue={
                                sideContentArray[0]?.subValue ?
                                    sideContentArray[0].subValue :
                                    []}
                        ></SideContent>
                        <Fade in={sideContentArray.length === 2}>
                            <div>
                                <SideContent
                                    key={"Depth of invasion in Early gastric cancer"}
                                    title={"Depth of invasion in Early gastric cancer"}
                                    mainValue={
                                        sideContentArray[1]?.mainValue ?
                                            sideContentArray[1].mainValue :
                                            <>&nbsp;</>}
                                    subValue={
                                        sideContentArray[1]?.subValue ?
                                            sideContentArray[1].subValue :
                                            []}
                                ></SideContent>
                            </div>
                        </Fade>
                    </div>

                </div>
            </Grid>
        </aside>
    )
}
