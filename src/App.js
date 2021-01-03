
import { React, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview,setPreview] = useState(null);


  useEffect(() => {
    setPreview(<img className='img_preview' width = "100%" height = "100%" src={previewURL}></img>);
    return () => {
    }
  }, [previewURL])

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    }
    reader.readAsDataURL(file);
  }



  return (
    <div className="App">
      <div style = {{width : "30%"}}>
        <input type='file' onChange={handleFileOnChange}></input>
      </div>
      <div style = {{width : "70%"}}>
        {preview}
      </div>
    </div>
  );
}

export default App;
