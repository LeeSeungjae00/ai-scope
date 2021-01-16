
import { React, useState, useEffect, useRef } from 'react';
import { Typography, Grid, Paper, ButtonGroup, Button, CardActions, CardContent, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#afafaf',
    color : 'rgb(55 71 79);'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'rgb(140 140 140);',
     background: '#292929'
  },
  buttonArray: {
    width: '100%'
  },
  button: {
    flex: 1,
    color: '#c7c7c7',
    borderColor: '#c7c7c7'
  }
}));


function App() {
  const classes = useStyles();
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (file !== '')
      setPreview(<img alt="./alt.jpeg" className='img_preview' src={previewURL}></img>);
    return () => {
    }
  }, [previewURL, file])

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    }
    if (file)
      reader.readAsDataURL(file);
  }

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  }



  return (
    <div className = "App">
      <div className="priveiw-rapping">
        {preview}
      </div>
      <header className="side-header">
          <Typography align="center" variant="overline" display="block">
            AI-assisted Endoscopic Diagnostic Device
        </Typography>
        </header>
      <aside className="side">
        <input ref={fileRef} hidden={true} id="file" type='file' onChange={handleFileOnChange}></input>
        
        <div style={{ padding: 10 }}>
          {/* <button onClick={handleFileButtonClick}>UPLOAD</button> */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ButtonGroup className={classes.buttonArray} variant="text" size="small" aria-label="text primary button group">
                <Button className={classes.button} onClick={
                  handleFileButtonClick
                } >UPLOAD</Button>
                <Button className={classes.button} >SEND</Button>
              </ButtonGroup>
              <hr></hr>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography  variant="h6" color="textSecondary" gutterBottom>
                    Differential diganosis
                  </Typography>
                  <Typography variant="h4" component="h2">
                    <p>EGC : 78.2%</p>
                  </Typography>
                  <Typography variant="h11" className={classes.pos} color="textSecondary">
                    <div>AGC : 24.6%</div>BGU : 13.0%
                </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Depth of invasion in EGC
                  </Typography>
                  <Typography variant="h4" component="h2">
                    <p>T1b : 78.2%</p>
                  </Typography>
                  <Typography variant="h11" className={classes.pos} color="textSecondary">
                    T1a : 21.8%
                </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </aside>
    </div>
  );
}

export default App;
