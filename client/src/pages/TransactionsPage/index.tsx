import "./index.css"
import { productList } from "./data";

const TransactionsPage = () =>{
    return(
        <>
            <div className="transactions-page">
                {/* search bar */}
                {/* list products */}
                {
                    productList.map((x:any, key:any)=>{
                        return (
                            <>
                                <h1 id={key} key={key}>{x && x.title}</h1>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default TransactionsPage;