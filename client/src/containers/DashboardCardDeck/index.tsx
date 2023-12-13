import "./index.css"
import { DashboardCard } from "../../components";

import { imgStore, imgUser, imgTransaction } from "../../assets/app-icons";
import { DashboardCardDeckProps } from "../../utils/types";

const DashboardCardDeck = ({handler}:DashboardCardDeckProps) =>{



    const dashboardMenu = [
        {name: 'transactions', restriction: '', image: imgTransaction, color: "", handler:handler},
        {name: 'accounts', restriction: '', image: imgUser, color: "", handler:handler},
        {name: 'stores', restriction: '', image: imgStore, color: "", handler:handler}
    ]

    return (
        <>
            <div className="dashboard-card-deck">
                {
                    dashboardMenu.map((x:any, key:any)=>{
                        return (
                            <>
                                <div className="grid-group">
                                    <DashboardCard data={x}/>
                                </div>
                                
                            </>
                        )
                    })
                }
            </div>
        </>
    )
};

export default DashboardCardDeck;