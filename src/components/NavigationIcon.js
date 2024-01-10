import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';

function NavigationIcon() {
    const location = useLocation();
    const navigate = useNavigate();
    const [onSettingsPage, setOnSettingsPage] = useState(false);

    useEffect(() => {
        setOnSettingsPage(location.pathname === '/parametres');
    }, [location]);

    const handleNavigationClick = () => {
        if (onSettingsPage) {
            // Logique pour sauvegarder les données
        } else {
            navigate('/parametres');
        }
    };

    return (
        <IconButton color="inherit" onClick={handleNavigationClick}>
            {onSettingsPage ? <SaveIcon /> : <SettingsIcon />}
        </IconButton>
    );
}

export default NavigationIcon;
