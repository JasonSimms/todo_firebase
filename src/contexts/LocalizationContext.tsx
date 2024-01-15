/**
 * Required for Material UI date picker
 * 
 */

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactNode } from 'react';




const LocalizationLoader: React.FC<{ children: ReactNode }> = ({ children, }) => {
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
    </LocalizationProvider>)
};

export default LocalizationLoader;