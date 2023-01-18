import { useNavigate } from "react-router-dom";
import Button from "../../../../Shared/Button/Button";
import { Tooltip } from "react-tooltip";
export default function LoggedIn() {
    const navigate = useNavigate();
    const userContacts = [];
    const user = JSON.parse(sessionStorage.getItem("last-login")).username;
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (parsedJson.user === user) { userContacts.push(parsedJson) }
    }
    return (
        <form className="loggedIn">
            <Button
                className="close-btn"
                onClick={() => navigate("/")} />
            <h3>نام کاربری شما: {user}</h3>
            <h3>تعداد مخاطبین شما: {userContacts.length}</h3>
            <Button
                id="powerOff"
                className="power-off-btn"
                tooltipContent="خروج"
                onClick={() => {
                    sessionStorage.clear();
                    navigate("/");
                }} />
            <Tooltip anchorId="powerOff" className='tooltip red-tooltip' />
        </form>
    )
}