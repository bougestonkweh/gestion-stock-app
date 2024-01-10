import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TextField } from '@mui/material';

const TableauArticles = ({ articles }) => {
    const [selections, setSelections] = useState({});
    const [quantites, setQuantites] = useState({});
    const [typesLivraison, setTypesLivraison] = useState({});

    const optionsConditionnement = ["Carton x1", "Carton x2", "Carton x3", "Carton x4", "Carton x5", "Carton x6"];
    const optionsTypeLivraison = ["BoissonEconomat", "BunsVeg", "Standard", "Bulk", "Hide"];

    const handleConditionnementChange = (codeProduit, newValue) => {
        setSelections(prev => ({ ...prev, [codeProduit]: newValue }));
    };

    const handleQuantiteChange = (codeProduit, newValue) => {
        setQuantites(prev => ({ ...prev, [codeProduit]: newValue }));
    };

    const handleTypeLivraisonChange = (codeProduit, newValue) => {
        setTypesLivraison(prev => ({ ...prev, [codeProduit]: newValue }));
    };

    const saveData = () => {
        window.electron.invoke('save-articles', articles);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="tableau d'articles">
                <TableHead>
                    <TableRow>
                        <TableCell>Code Produit</TableCell>
                        <TableCell>Nom du Produit</TableCell>
                        <TableCell>Unité de Stock</TableCell>
                        <TableCell>Conso Réelle</TableCell>
                        <TableCell>Conditionnement</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Type de Livraison</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article.codeInterneProduit}>
                            <TableCell>{article.codeInterneProduit}</TableCell>
                            <TableCell>{article.nomProduit}</TableCell>
                            <TableCell>{article.uniteDeStock}</TableCell>
                            <TableCell>{article.consoReelleQuantite}</TableCell>
                            <TableCell>
                                <Select
                                    value={selections[article.codeInterneProduit] || ''}
                                    onChange={(e) => handleConditionnementChange(article.codeInterneProduit, e.target.value)}
                                    fullWidth
                                >
                                    {optionsConditionnement.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={quantites[article.codeInterneProduit] || ''}
                                    onChange={(e) => handleQuantiteChange(article.codeInterneProduit, e.target.value)}
                                    size="small"
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={typesLivraison[article.codeInterneProduit] || ''}
                                    onChange={(e) => handleTypeLivraisonChange(article.codeInterneProduit, e.target.value)}
                                    fullWidth
                                >
                                    {optionsTypeLivraison.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <button onClick={saveData}>Enregistrer les Données</button>
        </TableContainer>
    );
};

export default TableauArticles;
