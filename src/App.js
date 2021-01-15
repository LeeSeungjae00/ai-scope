
import { React, useState, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import './App.css';

function App() {
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (file !== '')
      setPreview(<img className='img_preview' src={previewURL}></img>);
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
    if (file)
      reader.readAsDataURL(file);
  }

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  }



  return (
    <>
      <div className="priveiw-rapping">
        {preview}
      </div>
      
      <aside className="side">
        <input ref={fileRef} hidden={true} id="file" type='file' onChange={handleFileOnChange}></input>
        <header className="side-header">
          <Typography align="center" variant="overline" display="block" gutterBottom>
            Title text
        </Typography>
        </header>
        <div style={{ padding: 10 }}>
          <button onClick={handleFileButtonClick}>UPLOAD</button>
        </div>
      </aside>
    </>
  );
}

export default App;
