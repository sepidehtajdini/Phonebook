import "./header.css";
import Button from "../../Shared/Button/Button";
import Search from "./Search/Search";
import { useContext } from "react";
import SearchContext from "../../SearchContext";
import { useNavigate } from "react-router-dom";
function Header() {
    const { setAlphabetsClass, setOutlet } = useContext(SearchContext);
    const navigate = useNavigate();
    return (
        <nav className="header">
            <Search />
            <Button
                className="alphabets-btn"
                // text="حروف الفبا"
                onClick={() => {
                    setOutlet("sideBar");
                    setAlphabetsClass("hide");
                    navigate("Home/SideBar")
                }}
                type="button" />

            <Button
                className="contacts-list-btn"
                // text="لیست مخاطبین"
                onClick={() => {
                    setOutlet("contacts-list");
                    setAlphabetsClass("hide");
                    navigate("Home/ContactsList")
                }}
                type="button" />

            <Button
                className="delete-btn"
                text="+"
                onClick={() => {
                    setOutlet("form");
                    setAlphabetsClass("hide");
                    navigate("Home/AddNewContactForm")
                }}
                type="button" />
        </nav>
    )
}
export default Header