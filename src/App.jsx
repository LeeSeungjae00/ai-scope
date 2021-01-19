
import { React, useState, useEffect} from 'react';

import './App.css';
import Hedaer from './Container/Header/Header';
import Side from './Container/Side/Side';



function App() {
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);

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



  return (
    <div className = "App">
      <div className="priveiw-rapping">
        {preview}
      </div>
      <Hedaer title = "AI-assisted Endoscopic Diagnostic Device"></Hedaer>
      <Side 
        onChangeFile = {handleFileOnChange} 
        onFileButtonClick = {handleFileButtonClick}>
      </Side>
    </div>
  );
}

export default App;
