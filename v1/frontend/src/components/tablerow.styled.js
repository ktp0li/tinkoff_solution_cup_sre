import React from 'react';
import {TableRow, styled} from '@mui/material';


const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: 'white',
    '&:nth-of-type(odd)': {
        backgroundColor: '#f6f7f8',
    },
}));

export default StyledTableRow;
