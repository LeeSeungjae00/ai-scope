
import axios from 'axios';
import { React, useState, useEffect } from 'react';

import './App.css';
import Header from './Container/Header/Header';
import Side from './Container/Side/Side';
import madeSideContent from './Module/madeSideContent'




function App() {
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [resultData, setResultData] = useState([]);
  const [sideContentArray, setSideContentArray] = useState([]);

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

        sideContentArray.splice(0);

        sideContentArray.push(...madeSideContent([{BGU}, {EGC}, {AGC}]));
        setSideContentArray(sideContentArray);

        setLoading(false);
      }
    } catch (error) {

      let fakeData = {
        result : `/fakeResultImg.png`,
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
    <div className="App">
      <div className="priveiw-rapping">
        {preview}
      </div>
      <Header title="AI-assisted Endoscopic Diagnostic Device"></Header>
      <Side
        onChangeFile={handleFileOnChange}
        onFileButtonClick={handleFileButtonClick}
        onSendFile = {handleSendClick}
        sideContentArray = {sideContentArray}
        loading = {loading}
        >
      </Side>
    </div>
  );
}

export default App;
