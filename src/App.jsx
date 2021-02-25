
import axios from 'axios';
import { React, useState, useEffect , useCallback} from 'react';
import './App.css';
import Hedaer from './Container/Header/Header';
import Side from './Container/Side/Side';
import madeSideContent from './Module/madeSideContent'
import {CircularProgress , Fade , Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useDropzone} from 'react-dropzone'
import { FolderOpenOutlined ,MouseOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  mainProgress: {
      color: "#c0d7e0"
  }
}));


function App() {
  const classes = useStyles();
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sideContentArray, setSideContentArray] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    sideContentArray.splice(0);

    setSideContentArray(sideContentArray);

    let file = acceptedFiles[0];
    if(file?.type.split('/')[0] !== "image"){
      alert('Please upload image File.');
      return;
    }
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
      // setAfterPreview(<div style = {{width : "100%"}}></div>)
      // setAfterPreviewURL(reader.result);
    }
    if (file)
      reader.readAsDataURL(file);
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  useEffect(() => {
    if (file !== ''){
      setPreview(<img alt="./alt.jpeg" className='img_preview' src={previewURL}></img>);
    }
    return () => {
    }
  }, [previewURL, file])

  const handleFileOnChange = (event) => {
    sideContentArray.splice(0);

    setSideContentArray(sideContentArray);

    let file = event.target.files[0];
    if(file?.type.split('/')[0] !== "image"){
      alert('Please upload image File.');
      return;
    }
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    }
    if (file)
      reader.readAsDataURL(file);
  }

  const handleFileButtonClick = (e, fileRef) => {
    e.preventDefault();
    fileRef.current.click();
  }

  async function handleSendClick(e) {
    try {
      if (file !== '') {
        setLoading(true);
        let form = new FormData();
        form.append("image", file)
        // const tome = await new Promise((res) => {setTimeout(()=>res("dd"),1000)})
        const response = await axios.post('/data', form);
        console.log(response);
        const { result, BGU, EGC, AGC } = response.data;

        setPreviewURL("data:image/png;base64," + result);
        setPreview(<img alt="./alt.jpeg" className='img_preview' src={previewURL}></img>);

        sideContentArray.splice(0);

        sideContentArray.push(...madeSideContent([{BGU}, {EGC}, {AGC}]));
        setSideContentArray(sideContentArray);

        
        setLoading(false);
      }else{
        alert('Please, Upload File');
      }
    } catch (error) {

      let fakeData = {
        result : `/.png`,
        BGU : { value : 13 },
        EGC : {
          value : 78.2,
          depth : {
            T1a : 21.8,
            T1b : 78.2
          }
        },
        AGC : { value : 24.6 }
      }

      const {result, BGU, EGC, AGC} = fakeData;

      setPreview(<img alt="./alt.jpeg" className='img_preview' src={result}></img>);

      sideContentArray.splice(0);

      sideContentArray.push(...madeSideContent([{BGU}, {EGC}, {AGC}]));
      setSideContentArray(sideContentArray);
      console.log(sideContentArray);

      setLoading(false);
    }
  }

  return (
    <>
    <Fade in = {loading}><div className = "screenblru"><CircularProgress size={90} className = {classes.mainProgress}/></div></Fade>
    <div className="App">
      <div {...getRootProps()} className="priveiw-rapping">
        {(preview === null) ? 
          <div className = 'non-priveiw'>
          <Typography style = {{fontSize : "1.3rem"}}>'</Typography>
          <FolderOpenOutlined />
          <Typography style = {{fontSize : "1.3rem"}}>SELECT FILE' or</Typography>
          <MouseOutlined />
          <Typography style = {{fontSize : "1.3rem"}}>Drag and Drop the file here</Typography>
          </div>
         :preview}
      </div>
      <Hedaer title="AI-assisted Endoscopic Diagnostic Device"></Hedaer>
      <Side
        onChangeFile={handleFileOnChange}
        onFileButtonClick={handleFileButtonClick}
        onSendFile = {handleSendClick}
        sideContentArray = {sideContentArray}
        fileProps = {getInputProps}
        >
      </Side>
    </div>
    </>
  );
}

export default App;
