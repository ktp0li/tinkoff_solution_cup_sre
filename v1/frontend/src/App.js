import React, {useState} from 'react';
import {FormLabel, TextField, Button, FormControl} from '@mui/material';

import FileUploader from './components/FileUploader';


const App = () => {
    const [websiteURL, setWebsiteURL] = useState('');
    const [testFiles, setTestFiles] = useState([]);
  
    const updateUploadedTestFiles = files => setTestFiles([...testFiles, ...files]);
  
    const handleSubmit = event => {
      event.preventDefault();
      // ...
    };
  
    return (
        <FormControl
            action='#'
            method='POST'
            enctype='multipart/form-data'
            style={{
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                maxWidth: '800px',
                margin: '1rem auto',
            }}
            onSubmit={handleSubmit}
        >
            <FormLabel> URL тестируемой страницы </FormLabel>
            <TextField
                placeholder='http://example.com' type='url' size='medium' variant='outlined'
                onChange={event => setWebsiteURL(event.target.value)}
            />
            <FileUploader
                multiple
                cb={updateUploadedTestFiles}
            />
            <Button
                type='submit' size='medium' variant='contained' color='primary'
            >
                Запустить
            </Button>
        </FormControl>
    );
}

export default App;
