import React, {useState} from 'react';
import {FormLabel, TextField, Button, FormControl, List, ListItem} from '@mui/material';

import Dropzone from './components/Dropzone';


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
            encType='multipart/form-data'
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
                value={websiteURL}
                onChange={event => setWebsiteURL(event.target.value)}
            />
            <Dropzone
                onDrop={files => updateUploadedTestFiles(files)}
            >
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Dropzone>
            <List>
                {testFiles.map(file => (
                    <ListItem key={file.path}>{file.name}</ListItem>
                ))}
            </List>
            <Button
                type='reset' size='small' variant='outlined' color='error'
                style={{marginBottom: '1rem'}}
                onClick={(event) => {
                    event.preventDefault();
                    setTestFiles([]);
                }}
            >
                Сбросить все тесты
            </Button>
            <Button
                type='submit' size='medium' variant='contained' color='primary'
            >
                Запустить
            </Button>
        </FormControl>
    );
}

export default App;
