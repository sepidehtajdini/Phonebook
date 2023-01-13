import { Tooltip } from 'react-tooltip';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Shared/Button/Button";
import Search from "./Search/Search";
import SearchContext from "../../SearchContext";
import NewContactContext from "../../NewContactContext";
import "../../../node_modules/react-tooltip/dist/react-tooltip.min.css";
import "./header.css";
function Header() {
    const { setAlphabetsClass, setOutlet } = useContext(SearchContext);
    const { theme, setTheme } = useContext(NewContactContext);
    const navigate = useNavigate();
    return (
        <nav className={theme === "pinkTheme" ? "header pink-header" : "header olive-header"}>
            <Button
                id="signup"
                tooltipContent="عضویت|ورود"
                className="sign-in-btn"
                onClick={() => {
                    setOutlet("form");
                    setAlphabetsClass("hide");
                    navigate("/SignUp")
                }} />
            <Tooltip anchorId="signup" className='tooltip' />
            <Search />
            <Button
                id="alphabets"
                tooltipContent="حروف الفبا"
                className="alphabets-btn"
                onClick={() => {
                    {
                        theme === "pinkTheme" ? setOutlet("sideBar pink-sideBar")
                            : setOutlet("sideBar olive-sideBar")
                    }
                    setAlphabetsClass("hide");
                    navigate("/SideBar")
                }}
                type="button" />
            <Tooltip anchorId="alphabets" className='tooltip' />

            <Button
                id="list"
                tooltipContent="لیست مخاطبین"
                className="contacts-list-btn"
                onClick={() => {
                    setOutlet("contacts-list");
                    setAlphabetsClass("hide");
                    navigate("/ContactsList")
                }}
                type="button" />
            <Tooltip anchorId="list" className='tooltip' />

            <Button
                id="themeChange"
                tooltipContent="تغییر رنگ"
                className="theme-btn"
                onClick={() => theme === "oliveTheme" ? setTheme("pinkTheme") : setTheme("oliveTheme")}
                type="button" />
            <Tooltip anchorId="themeChange" className='tooltip' />

            <Button
                id="addingContact"
                tooltipContent="افزودن مخاطب"
                className={theme === "pinkTheme" ? "delete-btn" : "green-btn"}
                text="+"
                onClick={() => {
                    setOutlet("form");
                    setAlphabetsClass("hide");
                    navigate("/AddNewContactForm")
                }}
                type="button" />
            <Tooltip
                anchorId="addingContact"
                className={theme === "pinkTheme" ? 'tooltip red-tooltip' : "tooltip green-tooltip"} />
        </nav>
    )
}
export default Header