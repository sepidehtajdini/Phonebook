import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import NewContactContext from "../../../../NewContactContext";
import Button from "../../../../Shared/Button/Button";
import { Tooltip } from "react-tooltip";
export default function LoggedIn() {
    const navigate = useNavigate();
    const { setIsLoggedIn, user, setUser } = useContext(NewContactContext);
    const userContacts = [];
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (parsedJson.user === user.username) { userContacts.push(parsedJson) }
    }
    return (
        <form className="loggedIn">
            <Button
                className="close-btn"
                onClick={() => navigate("/")} />
            <h3>نام کاربری شما: {user.username}</h3>
            <h3>تعداد مخاطبین شما: {userContacts.length}</h3>
            <Button
                id="powerOff"
                className="power-off-btn"
                tooltipContent="خروج"
                onClick={() => {
                    setIsLoggedIn(false);
                    setUser("");
                    sessionStorage.clear();
                    navigate("/");
                }} />
            <Tooltip anchorId="powerOff" className='tooltip red-tooltip' />
        </form>
    )
}