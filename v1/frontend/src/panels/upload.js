import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';

import Dropzone from '../components/Dropzone';
import { useTheme } from 'styled-components';
import StyledTableRow from '../components/tablerow.styled';


const UploadPanel = ({hostname}) => {

    let testIndex = 0;

    const [username, setUsername] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
    const [testFiles, setTestFiles] = useState([]);
    const [logs, setLogs] = useState([]);

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

    return (
        <Box>
            <FormControl
                action='#'
                method='POST'
                encType='multipart/form-data'
                style={{
                    width: '100%',
                    margin: '1rem 0',
                }}
            >
                <FormLabel> Пользователь </FormLabel>
                <TextField
                    placeholder='username' type='text' size='medium' variant='outlined'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <FormLabel> URL тестируемой страницы </FormLabel>
                <TextField
                    placeholder='https://www.tinkoff.ru/' type='url' size='medium' variant='outlined'
                    value={websiteURL}
                    onChange={event => setWebsiteURL(event.target.value)}
                />
                <Dropzone
                    onDrop={async files => {
                        for (let file of files) {
                            const fr = new FileReader();
                            fr.onload = event => setTestFiles([...testFiles, {meta: file, content: event.target.result}]);
                            fr.readAsText(file);
                        }
                    }}
                />
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {testFiles.map(file => (
                                <StyledTableRow key={file.meta.path}>
                                    <TableCell style={{
                                        fontFamily: 'sans-serif',
                                        fontSize: '14px',
                                    }}>
                                        {file.meta.name}
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <List>
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
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {logs.map(log => (
                                <StyledTableRow key={testIndex++}>
                                    <TableCell
                                        size='small'
                                        style={{
                                            fontFamily: 'monospace',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {log}
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default UploadPanel;
