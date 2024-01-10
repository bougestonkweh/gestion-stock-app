import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Article } from '../models/Article';

function ExcelUploader({ onFileProcessed }) {
    const [items, setItems] = useState([]);

    const readExcelFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            setItems(json);
            const articles = json.map(item => new Article(item));
            onFileProcessed(articles);

        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" accept=".xlsx" onChange={(e) => readExcelFile(e.target.files[0])} />
            {/* Supprimez ou commentez la ligne suivante pour ne pas afficher les données brutes */}
            
            {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
        </div>
    );
}

export default ExcelUploader;
