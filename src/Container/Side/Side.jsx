import './Side.css'
import { React, useRef, useEffect, useState } from 'react';
import { Grid, ButtonGroup, Button ,CircularProgress} from '@material-ui/core';
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
    }
}));






export default function Side({ onChangeFile, onFileButtonClick, onSendFile, resultData, loading }) {
    const fileRef = useRef();
    const classes = useStyles();
    const [sideContentArray, setSideContentArray] = useState([]);

    function madeSideContent(result) {
        if (result.length < 3) return [];
        const resultArray = [];

        result.sort((a, b) => Number.parseInt(b.value) - Number.parseInt(a.value));


        resultArray.push({
            title: "Differential diganosis",
            mainValue: `${Object.keys(result[0][0])} : ${result[0].value}%`,
            subValue: [
                `${Object.keys(result[1][0])} : ${result[1].value}%`,
                `${Object.keys(result[2][0])} : ${result[2].value}%`
            ]
        })

        if (Object.keys(result[0][0]) === "EGC") {
            const { T1a, T1b } = result[0].depth;

            resultArray.push({
                title: "Depth of invasion in EGC",
                mainValue: `${T1a > T1b ?
                    "T1a : " + T1a.value + "%" :
                    "T1b : " + T1b.value + "%"}`,
                subValue: [`${T1a < T1b ?
                    "T1a : " + T1a.value + "%" :
                    "T1b : " + T1b.value + "%"}`]
            })
        }
        return resultArray
    }



    useEffect(() => {
        setSideContentArray(madeSideContent(resultData));
        return () => {

        }
    }, [resultData])

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
                            <SendOutlined className={classes.icon}></SendOutlined>
                            SEND</Button>
                    </ButtonGroup>
                    <hr></hr>
                </Grid>
                {loading ? <div className = "loading-rapping"><CircularProgress /></div> : 
                    sideContentArray.map(sideContent =>
                        <SideContent
                            title={sideContent.title}
                            mainValue={sideContent.mainValue}
                            subValue={sideContent.subValue}
                        ></SideContent>)
                }
                {/* <SideContent
                    title = "Differential diganosis"
                    mainValue = "EGC : 78.2%"
                    subValue = {["AGC : 24.6%", "BGU : 13.0%"]}
                ></SideContent>
                <SideContent
                    title = "Depth of invasion in EGC"
                    mainValue = "T1b : 78.2%"
                    subValue = {["T1a : 21.8%"]}
                ></SideContent> */}
                {/*  */}
            </Grid>
        </aside>
    )
}
