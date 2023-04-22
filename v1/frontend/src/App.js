import React, {useState} from 'react';
import {FormLabel, TextField, Button, FormControl, List, ListItem, Tabs, Tab, Box, TabPanel} from '@mui/material';

import UploadPanel from './panels/upload';
import ResultPanel from './panels/result';


const App = () => {

    const hostname = 'localhost:5000';

    const [activeTab, setActiveTab] = useState('upload');

    return (<>
        <Box style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#EEEEFF',
        }}>
            <Tabs
                variant='fullWidth'
                value={activeTab}
                onChange={(event, value) => setActiveTab(value)}
                aria-label="wrapped label tabs example"
            >
                <Tab value='upload' label="Загрузить файлы" />
                <Tab value='result' label='Получить результат' />
                <Tab value='signup' label='Регистрация' />
            </Tabs>
        </Box>
        <Box role='tabpanel'>
            {activeTab === 'upload' && <UploadPanel hostname={hostname} />}
            {activeTab === 'result' && (<ResultPanel hostname={hostname} />)}
        </Box>
    </>);
}

export default App;
