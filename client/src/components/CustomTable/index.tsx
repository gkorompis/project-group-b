

import "./index.css"
import React, {Fragment} from "react";

const openLinkHandler = (link:any) =>{
    console.log("link", link)
    window.open("dashboard", '_blank');
}



const ChunkTable=({data, handlers}:any)=>{

    const defaultData = data || [ {"a": 1, "b": 2, "c": 3, "status": "update"}, {"a": 5, "b": 6, "c": 8, "status": "update"}];
    console.log("table rendered again");

    const columns_name = Object.keys(defaultData[0]);
    const column_url = "status";
    const column_exclude = ["products"]

    const {handlePayment }= handlers;

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
                            <ChunksRow key={index} row={row} columns={columns_name} column_url={column_url} column_exclude={column_exclude} handlers={handlers}/>
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
                <th key={0} className='chunks-row chunks-row-head'>Process Payment</th>
                {columns.map((column_name:any, index:any)=>{
                    return <th key={+index+1} className='chunks-row chunks-row-head'>{column_name}</th>
                })}
            </tr>
        </Fragment>
    )
}

const ChunksRow=({row, columns, column_url, column_exclude, handlers}:any)=>{
    const {handlePayment} = handlers;
    const idTransaction = row["id"];
    return (
        <Fragment>
            <tr className='chunks-row'>
                <td 
                    key={0} 
                    className={`chunks-row chunks-row-body   `} onClick={()=>handlePayment(idTransaction)} >
                        <p className="row-link">process</p>
                </td>
                {Object.keys(row).map( (name:any, index:any) => {
                    
                    const colName = columns[index];
                    const value = row[colName];
                    let cellValue = column_exclude.includes(colName) ? value && value.length : value;
             

                    return <td 
                    key={+index+1} 
                    className={`chunks-row chunks-row-body  `}  >
                        {cellValue}
                    </td>
                } )}
            </tr>
        </Fragment>
    )
}

export default ChunkTable;