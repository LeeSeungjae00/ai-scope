import './Side.css'
import { React, useRef } from 'react';
import { Grid, ButtonGroup, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideContent from '../SideContent/SideContent';
import { CloudUploadOutlined, SendOutlined } from '@material-ui/icons';


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
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));






export default function Side({ onChangeFile, onFileButtonClick, onSendFile, sideContentArray, loading }) {
    const fileRef = useRef();
    const classes = useStyles();;

    return (
        <aside className="side">
            <input ref={fileRef} hidden={true} id="file" type='file' onChange={onChangeFile}></input>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ButtonGroup
                        className={classes.buttonArray}
                        variant="text" size="small"
                        aria-label="text primary button group">
                        <Button className={classes.button} onClick={(e) => {
                            onFileButtonClick(e, fileRef);
                        }}>
                            <CloudUploadOutlined className={classes.icon}></CloudUploadOutlined>
                            UPLOAD</Button>
                        <Button className={classes.button} onClick={(e) => {
                            onSendFile(e);
                        }}>
                            {
                                loading ?
                                    <><CircularProgress size={24} className={classes.buttonProgress} />&nbsp;</> :
                                    <><SendOutlined className={classes.icon} ></SendOutlined>Send</>
                            }
                        </Button>
                    </ButtonGroup>
                    <hr></hr>
                </Grid>
                {loading ? <div className="loading-rapping"><CircularProgress /></div> :
                    sideContentArray.map(sideContent =>
                        <SideContent
                            key={sideContent.title}
                            title={sideContent.title}
                            mainValue={sideContent.mainValue}
                            subValue={sideContent.subValue}
                        ></SideContent>)
                }
            </Grid>
        </aside>
    )
}
