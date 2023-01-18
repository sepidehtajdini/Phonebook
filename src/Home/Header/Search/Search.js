import { Tooltip } from 'react-tooltip';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../../SearchContext";
import Button from "../../../Shared/Button/Button";
import "./search.css";
function Search() {
    const navigate = useNavigate();
    const { searchText, setSearchText, setFindText, setOutlet, setAlphabetsClass } = useContext(SearchContext);
    const properties = [];
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (sessionStorage.getItem("last-login")) {
            const user = JSON.parse(sessionStorage.getItem("last-login")).username;
            if (parsedJson.user === user) {
                properties.push(`<li>${"نام و نام خانوادگی: " + parsedJson.newName + " " + parsedJson.newLastName +
                    "<br/> شماره تلفن: " +
                    ((parsedJson.numbers).map((num) => `<div>${num}</div>`)) +
                    "<br/>" + parsedJson.newEmail}</li>`)
            }
        }
        else {
            if (parsedJson.user === "") {
                properties.push(`<li>${"نام و نام خانوادگی: " + parsedJson.newName + " " + parsedJson.newLastName +
                    "<br/> شماره تلفن: " +
                    (parsedJson.numbers.map((num) => `<div>${num}</div>`)) +
                    "<br/>" + parsedJson.newEmail}</li>`)
            }
        }
    }
    function search() {
        for (let item of properties) {
            if (item.includes(searchText)) {
                result.push(item);
            }
        }
        setFindText(result.toString().replaceAll(",", ""))
    }
    function searchBtn() {
        setAlphabetsClass("hide");
        setOutlet("search-result");
        search();
        navigate("/SearchResult");
    }

    function searchInput(e) { setFindText(""); setSearchText(e.target.value) }
    return (
        <span className="search-container">
            <input
                placeholder="جستجوی تلفن، نام یا ایمیل"
                autoFocus
                onChange={searchInput} />
            <Button
                id="search"
                tooltipContent="جستجو"
                type="button"
                onClick={searchBtn}
                className="search-btn" />
            <Tooltip anchorId='search' className='tooltip' />
        </span>
    )
}
export default Search