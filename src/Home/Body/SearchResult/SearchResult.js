import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../../SearchContext";
import NewContactContext from "../../../NewContactContext";
import Button from "../../../Shared/Button/Button";
function SearchResult() {
    const { theme } = useContext(NewContactContext);
    const navigate = useNavigate();
    const { findText, searchText } = useContext(SearchContext);
    return (
        <>
            {(searchText !== "" & findText !== "") ?
                <div className={theme === "pinkTheme"
                    ? "search-result-innerText pink-innerText"
                    : "search-result-innerText olive-innerText"}>
                    <Button
                        type="button"
                        className="close-btn"
                        onClick={() => navigate("/")} />
                    <ol dangerouslySetInnerHTML={{ __html: findText }} />
                </div>
                : <div>نتیجه ای یافت نشد</div>}
        </>
    )
}
export default SearchResult