import React, { useState } from 'react';
import { Button, FormControl, FormLabel, TextField } from '@mui/material';


const ResultPanel = ({hostname}) => {

    const [username, setUsername] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        window.location.assign(`http://${hostname}/getvideo/${username}`);
    };

    return (
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
            <Button
                type='button' size='medium' variant='contained' color='primary'
                onClick={handleSubmit}
                style={{marginTop: '1rem'}}
            >
                Получить результаты
            </Button>
        </FormControl>
    );
};

export default ResultPanel;
