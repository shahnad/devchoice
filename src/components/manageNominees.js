import React, { useRef, useEffect, useState } from "react";
import Papa from 'papaparse';


const ManageNominees = () => {

    const [csvData, setCsvData] = useState([]);

    const csvFile = "csv/contacts1.csv";
    const onChange = (e) => {
        e.persist();
        setCsvData({ ...csvData, [e.target.name]: e.target.value });
    }

    const importCSV = () => {
        Papa.parse(csvFile, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: data => {
                setCsvData(data.data);
            }
        });
        console.log(csvData);
    };

    // const updateData = (result) => {
    //     var data = result.data;
    //     console.log(data);
    //     setCsvData(data);
    // }

    return (
        <div>
            <h1>Upload Data</h1>
            <input
                className="CSVData"
                type="file"
                name="file"
                placeholder={null}
                onChange={onChange}
            />
            <button onClick={importCSV}>Upload CSV</button>
            <div className="managenominees">
            <table>
                {csvData.map(row => {
                    return (
                        <tr>
                            <td>{row.Name}</td>
                            <td>{row.Email}</td>
                        </tr>
                    );
                })}
            </table>
            </div>
            
        </div>
    )
}

export default ManageNominees