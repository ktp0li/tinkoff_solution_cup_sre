import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './styles/index.css';

import App from './App';


const theme = createTheme({
    palette: {
        primary: {
            main: '#fcc521'
        },
        secondary: {
            main: '#000000'
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ThemeProvider>
);
