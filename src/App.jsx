
import axios from 'axios';
import { React, useState, useEffect } from 'react';

import './App.css';
import Hedaer from './Container/Header/Header';
import Side from './Container/Side/Side';




function App() {
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState([]);

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

  const handleFileButtonClick = (e, fileRef) => {
    e.preventDefault();
    fileRef.current.click();
  }

  async function handleSendClick(e) {
    try {
      if (file !== '') {
        setLoading(true);
        let form = new FormData();
        form.append("result", file)
        const response = await axios.post('/data', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(response);
        const { result, BGU, EGC, AGC } = response.data;

        setPreview(<img alt="./alt.jpeg" className='img_preview' src={result}></img>);
        setResultData([{BGU}, {EGC}, {AGC}]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className="priveiw-rapping">
        {preview}
      </div>
      <Hedaer title="AI-assisted Endoscopic Diagnostic Device"></Hedaer>
      <Side
        onChangeFile={handleFileOnChange}
        onFileButtonClick={handleFileButtonClick}
        onSendFile = {handleSendClick}
        resultData = {resultData}
        loading = {loading}
        >
      </Side>
    </div>
  );
}

export default App;
