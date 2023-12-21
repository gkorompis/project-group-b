import "./index.css"

import { DashboardCardProps } from "../../utils/types";

const DashboardCard = ({data}:DashboardCardProps) =>{
    const {name, image, handler} = data
    return(
        <>
            <div id={name} className="dashboard-card" onClick={(e)=>handler(e)}>
                <img id={name}  className="card-logo" src={image}  onClick={(e)=>handler(e)} />
                <p className="card-title">{name}</p>
            </div>
        </>
    )
}

export default DashboardCard;