import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, BottomNavigation, BottomNavigationAction } from '@mui/material';
import NavigationIcon from './components/NavigationIcon'; // Importez le nouveau composant
import ExcelUploader from './components/ExcelUploader';
import SetupPage from './components/SetupPage';
import './App.css';

function App() {
    const [articles, setArticles] = useState([]);
    const [value, setValue] = useState(0);

    return (
        <Router>
            <div className="App">
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Gestion de Stock
                        </Typography>
                        <NavigationIcon /> {/* Utilisez le nouveau composant ici */}
                    </Toolbar>
                </AppBar>
                <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                    <Routes>
                        <Route exact path="/" element={<h1>Page d'Accueil</h1>} />
                        <Route path="/parametres" element={<SetupPage articles={articles} />} />
                    </Routes>
                </Container>
                <BottomNavigation
                    sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#fff' }}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Stock" />
                    <BottomNavigationAction label="CAD 1" />
                    <BottomNavigationAction label="CAD 2" />
                    <BottomNavigationAction label="CAD 3" />
                </BottomNavigation>
            </div>
        </Router>
    );
}

export default App;
