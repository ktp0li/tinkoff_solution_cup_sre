import React, {useRef, useState} from 'react';
import {FormLabel, TextField, Button, FormControl, List, ListItem} from '@mui/material';

import Dropzone from './components/Dropzone';


const App = () => {
    const hostname = 'localhost:5000';
    const [username, setUsername] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
    const [testFiles, setTestFiles] = useState([]);
    const [logs, setLogs] = useState([]);

    let testIndex = 0;

    const handleSubmit = event => {
        event.preventDefault();
        let socket = new WebSocket('ws://' + hostname + '/logs');

        socket.onmessage = event => {
            const log = (''+event.data)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
            setLogs([...logs, log]);
        };

        socket.onopen = () => {
            socket.send(JSON.stringify({
                username: username,
                url: websiteURL,
                tests: testFiles
            }))
        }
    };

    return (<>
        <FormControl
            action='#'
            method='POST'
            encType='multipart/form-data'
        >
            <FormLabel> Пользователь </FormLabel>
            <TextField
                placeholder='username' type='text' size='medium' variant='outlined'
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <FormLabel> URL тестируемой страницы </FormLabel>
            <TextField
                placeholder='http://example.com' type='url' size='medium' variant='outlined'
                value={websiteURL}
                onChange={event => setWebsiteURL(event.target.value)}
            />
            <Dropzone
                onDrop={files => {
                    for (let file of files) {
                        const fr = new FileReader();
                        fr.onload = event => setTestFiles([...testFiles, {meta: file, content: event.target.result}]);
                        fr.readAsText(file);
                    }
                }}
            >
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Dropzone>
            <List>
                {testFiles.map(file => (
                    <ListItem key={file.meta.path}>{file.meta.name}</ListItem>
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
                onClick={handleSubmit}
            >
                Запустить
            </Button>
        </FormControl>
        <div>
            <List>
                {logs.map(log => (
                    <ListItem key={testIndex++}>{log}</ListItem>
                ))}
            </List>
        </div>
    </>);
}

export default App;
