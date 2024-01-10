import React, { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import TableauArticles from './TableauArticles';

const SetupPage = () => {
    const [articles, setArticles] = useState([]);

    return (
        <div>
            <h1>Paramètres</h1>
            <ExcelUploader onFileProcessed={(data) => setArticles(data)} />
            <TableauArticles articles={articles} />
        </div>
    );
};

export default SetupPage;