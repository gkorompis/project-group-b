

import "./index.css"
import React, {Fragment} from "react";

const openLinkHandler = (link:any) =>{
    console.log("link", link)
    window.open("dashboard", '_blank');
}

const ChunkTable=({data}:any)=>{

    const defaultData = data || [ {"a": 1, "b": 2, "c": 3, "status": "update"}, {"a": 5, "b": 6, "c": 8, "status": "update"}];
    console.log("table rendered again");

    const columns_name = Object.keys(defaultData[0]);
    const column_url = "status";

    return (
        <Fragment>
            <div className="chunks-table-div">
                <table>
                <thead>
                    <ChunksColumnsRow columns={columns_name}/>
                </thead>
                <tbody>
                    {defaultData.map((row:any,index:any) => {
                        return (
                            <ChunksRow key={index} row={row} columns={columns_name} column_url={column_url}/>
                        )
                    })}
                </tbody>
                </table>
            </div>
            
        </Fragment>
    )  
}

const ChunksColumnsRow=({columns}:any)=>{
    return (
        <Fragment>
            <tr style={{color: '#332D2D'}} >
                {columns.map((column_name:any, index:any)=>{
                    return <th key={index} className='chunks-row chunks-row-head'>{column_name}</th>
                })}
            </tr>
        </Fragment>
    )
}

const ChunksRow=({row, columns, column_url}:any)=>{
    return (
        <Fragment>
            <tr className='chunks-row'>
                {Object.keys(row).map( (name:any, index:any) => {
                    return <td key={index} className={`chunks-row chunks-row-body  ${columns[index]==column_url? "row-link":""}`} onClick={columns[index]==column_url? ()=>openLinkHandler(row[columns[index]]): ()=> null}>{row[columns[index]]}</td>
                } )}
            </tr>
        </Fragment>
    )
}

export default ChunkTable;