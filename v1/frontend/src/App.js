import React, {useState} from 'react';
import {Tabs, Tab, Box} from '@mui/material';

import UploadPanel from './panels/upload';
import ResultPanel from './panels/result';


const App = () => {

    const hostname = 'localhost:5000';

    const [activeTab, setActiveTab] = useState('upload');

    return (<>
        <Box style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#fcc521',
            borderRadius: '5px',
        }}>
            <Tabs
                variant='fullWidth'
                textColor='inherit'
                indicatorColor='secondary'
                value={activeTab}
                onChange={(event, value) => setActiveTab(value)}
            >
                <Tab value='upload' label='Загрузить файлы' />
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
