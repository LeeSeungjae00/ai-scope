import { React, useRef } from 'react';
import { Grid, ButtonGroup, Button} from '@material-ui/core';
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
    icon : {
        marginRight : "3px",
        width : "0.7em"
    }
  }));

export default function Side({onChangeFile, onFileButtonClick}) {
    const fileRef = useRef();
    const classes = useStyles();

    return (
        <aside className="side">
            <input ref={fileRef} hidden={true} id="file" type='file' onChange={onChangeFile}></input>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ButtonGroup 
                        className={classes.buttonArray}
                        variant="text" size="small" 
                        aria-label="text primary button group">
                        <Button className={classes.button} onClick={(e) =>{
                            onFileButtonClick(e, fileRef);
                        }}>
                            <CloudUploadOutlined className = {classes.icon}></CloudUploadOutlined>
                            UPLOAD</Button>
                        <Button className={classes.button}>
                            <SendOutlined className = {classes.icon}></SendOutlined>
                            SEND</Button>
                    </ButtonGroup>
                    <hr></hr>
                </Grid>
                <SideContent
                    title = "Differential diganosis"
                    mainValue = "EGC : 78.2%"
                    subValue = {["AGC : 24.6%", "BGU : 13.0%"]}
                ></SideContent>
                <SideContent
                    title = "Depth of invasion in EGC"
                    mainValue = "T1b : 78.2%"
                    subValue = {["T1a : 21.8%"]}
                ></SideContent>
            </Grid>
        </aside>
    )
}
