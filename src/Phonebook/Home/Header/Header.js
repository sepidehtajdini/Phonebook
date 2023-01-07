import "./header.css";
import Button from "../../Shared/Button/Button";
import Search from "./Search/Search";
import { useContext } from "react";
import SearchContext from "../../SearchContext";
import { useNavigate } from "react-router-dom";
import NewContactContext from "../../NewContactContext";
function Header() {
    const { setAlphabetsClass, setOutlet } = useContext(SearchContext);
    const { theme, setTheme } = useContext(NewContactContext);
    const navigate = useNavigate();

    function toggleTheme() {
        if (theme === "oliveTheme") {
            setTheme("pinkTheme")
        }
        else {
            setTheme("oliveTheme")
        }
    }
    return (
        <nav className={theme === "pinkTheme" ? "header pinkHeader" : "header oliveHeader"}>
            <Search />
            <Button
                className="alphabets-btn"
                // text="حروف الفبا"
                onClick={() => {
                    {
                        theme === "pinkTheme" ? setOutlet("sideBar pink-sideBar")
                            : setOutlet("sideBar olive-sideBar")
                    }

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
                className="theme-btn"
                onClick={toggleTheme}
                type="button" />
            <Button
                className={theme === "pinkTheme" ? "delete-btn" : "green-btn"}
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