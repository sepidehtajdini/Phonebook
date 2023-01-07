import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../../SearchContext";
import Button from "../../../Shared/Button/Button";
function SearchResult() {
    const navigate = useNavigate();
    const { findText, searchText, setAlphabetsClass } = useContext(SearchContext);
    return (
        <>
            {(searchText !== "" & findText !== "") ?
                <div className="search-result-innerText">
                    <Button
                        type="button"
                        className="close-btn"
                        onClick={() => navigate("/")}
                    />
                    <ol dangerouslySetInnerHTML={{ __html: findText }} />
                </div>
                : <div>نتیجه ای یافت نشد</div>}
        </>
    )
}
export default SearchResult