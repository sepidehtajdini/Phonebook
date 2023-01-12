import { Tooltip } from 'react-tooltip';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../../SearchContext";
import NewContactContext from "../../../NewContactContext";
import Button from "../../../Shared/Button/Button";
import "./search.css";
function Search() {
    const navigate = useNavigate();
    const { searchText, setSearchText, setFindText, setOutlet, setAlphabetsClass } = useContext(SearchContext);
    const { isLoggedIn, user } = useContext(NewContactContext);
    const properties = [];
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (isLoggedIn) {
            if (parsedJson.user === user.username) {
                if (parsedJson.numbers !== {}) {
                    properties.push(
                        `<li>
                         ${"نام و نام خانوادگی:" + parsedJson.newName + " " + parsedJson.newLastName +
                        "<br/> شماره تلفن: " + parsedJson.newNumber + "<br/>" +
                        (Object.values(parsedJson.numbers).map((num) => `<div>${num}</div>`)) +
                        "<br/>" + parsedJson.newEmail}
                       </li>`
                    )
                }
                else {
                    properties.push(
                        `<li>
                             ${"نام و نام خانوادگی:" + parsedJson.newName + " " + parsedJson.newLastName +
                        "<br/> شماره تلفن: " + parsedJson.newNumber + "<br/>" +
                        "<br/>" + parsedJson.newEmail}
                           </li>`
                    )
                }
            }
        }
        else {
            if (parsedJson.user === "") {
                if (parsedJson.numbers !== {}) {
                    properties.push(
                        `<li>
                         ${"نام و نام خانوادگی:" + parsedJson.newName + " " + parsedJson.newLastName +
                        "<br/> شماره تلفن: " + parsedJson.newNumber + "<br/>" +
                        (Object.values(parsedJson.numbers).map((num) => `<div>${num}</div>`)) +
                        "<br/>" + parsedJson.newEmail}
                       </li>`
                    )
                }
                else {
                    properties.push(
                        `<li>
                             ${"نام و نام خانوادگی:" + parsedJson.newName + " " + parsedJson.newLastName +
                        "<br/> شماره تلفن: " + parsedJson.newNumber + "<br/>" +
                        "<br/>" + parsedJson.newEmail}
                           </li>`
                    )
                }
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