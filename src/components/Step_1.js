import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Step_1.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsBinaryString(file);
    }
  };

  const handleFileRead = (e) => {
    const content = e.target.result;
    const workbook = XLSX.read(content, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
    setData(data);
  };

  return (
    <div className="table-container">
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((value, j) => (
                  <td key={j}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileUpload;
