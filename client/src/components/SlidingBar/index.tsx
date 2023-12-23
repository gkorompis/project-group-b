import { useState } from "react";
import "./index.css"
import { imgArrow, imgLock, imgRandom } from "../../assets/app-icons";
import { SlidingBarProps, TransactionMenuItems } from "../../utils/types";
import { cookies } from "../../utils/global";

const SlidingBar = ({items, page}:SlidingBarProps<TransactionMenuItems>) =>{
    const cookiesAll = cookies.getAll();
    const {sessionRole} = cookiesAll;

    const listMenuItems = items || [];

    const [isSliding, setIsSliding] = useState(false)

    const handleSlidingBar = () =>{

        setIsSliding(!isSliding)
    }
    return (
        <>
            <div className={"sliding-bar " + (isSliding ? "top-left-div-sliding" : "top-left-div")} onClick={isSliding? ()=>null : handleSlidingBar}>
                <img className={"sliding-bar-img " + (isSliding ? "opacity-none" : "opacity-high")} src={imgArrow} onClick={handleSlidingBar}/>
                { <div className={"sliding-bar-menus " + (isSliding ? "opacity-high" : "opacity-none")}>
                        <p className="sliding-bar-title" onClick={handleSlidingBar}>{page}</p>
                        {
                            listMenuItems.map((x:TransactionMenuItems)=>{
                                const {field, image, handler} = x;
                                
                                let defaultImage = image || imgRandom;
                                const isNotAdmin = !(sessionRole=='admin' || sessionRole=="Admin")
                                defaultImage = isNotAdmin ? imgLock : defaultImage;
                                defaultImage = !(page == "accounts") ? imgRandom : defaultImage;

                                let defaultHandler = handler || (()=>null);
                                defaultHandler = isNotAdmin ? ()=>null : defaultHandler;
                                defaultHandler = !(page == "accounts") ? handler : defaultHandler;


                                return (
                                    <>
                                        <div className={"sliding-bar-menu-row  " + (isSliding ? "opacity-high" : "opacity-none")}>
                                            <img className="menu-row sliding-bar-menu-img" src={defaultImage}/>
                                            <p 
                                                className={"menu-row sliding-bar-menu-text " + (isSliding ? "opacity-high" : "opacity-none")} 
                                                onClick={defaultHandler}>
                                                {field}
                                            </p>
                                        </div>
                                    </>
                                )
                            })
                        }
                </div> }
            </div>
        </>
    )
}

export default SlidingBar;