import { SearchBarProps } from "../../utils/types";
import "./index.css"

const SearchBar = ({placeholderMessage}:SearchBarProps) =>{

    const placeholder = placeholderMessage || "what's to buy ?"
    return (
        <>
            <div className="search-bar-div">
                
                <input className="search-bar" placeholder={placeholder}/>
            </div>
        </>
    )
}

export default SearchBar;