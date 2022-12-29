import "./sidebar.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Shared/Button/Button";
import SearchContext from "../../../SearchContext";
function SideBar() {
    const navigate = useNavigate();
    const { setFindTextClass, setAlphabetsClass, setPair, setOutlet } = useContext(SearchContext);
    let contacts = [];
    let keyValues = [];
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.key(i));
        contacts.push(parsedJson.newLastName + " " + parsedJson.newName);
        keyValues.push(`${parsedJson.newLastName + " " + parsedJson.newName} : ${parsedJson.newNumber} ${parsedJson.newEmail}`);
    }
    function startLetter(letter) {
        const contactsNames = contacts.filter((contact) => contact.startsWith(letter));
        const contactsOfThisLetter = keyValues.filter((contact) => contact.startsWith(letter))
        const listOfKeyValues = contactsOfThisLetter.toString().replaceAll(",", '<br/>');
        setPair(listOfKeyValues)
    }
    return (
        <div>
            <Button
                className="close-btn"
                type="button"
                onClick={() => { setOutlet(""); setAlphabetsClass("hide"); navigate("/") }}
            />
            <Button
                className="sideBar-btn"
                text="الف"
                type="button"
                onClick={() => { startLetter("ا"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                text="ب"
                type="button"
                onClick={() => { startLetter("ب"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                text="پ"
                type="button"
                onClick={() => { startLetter("پ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                text="ت"
                type="button"
                onClick={() => { startLetter("ت"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                text="ث"
                type="button"
                onClick={() => { startLetter("ث"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ج"
                onClick={() => { startLetter("ج"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="چ"
                onClick={() => { startLetter("چ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide"); }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ح"
                onClick={() => { startLetter("ح"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="خ"
                onClick={() => { startLetter("خ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="د"
                onClick={() => { startLetter("د"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ذ"
                onClick={() => { startLetter("ذ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ر"
                onClick={() => { startLetter("ر"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ز"
                onClick={() => { startLetter("ز"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ژ"
                onClick={() => { startLetter("ژ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="س"
                onClick={() => { startLetter("س"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ش"
                onClick={() => { startLetter("ش"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ص"
                onClick={() => { startLetter("ص"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ض"
                onClick={() => { startLetter("ض"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ط"
                onClick={() => { startLetter("ط"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ظ"
                onClick={() => { startLetter("ظ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ع"
                onClick={() => { startLetter("ع"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="غ"
                onClick={() => { startLetter("غ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ف"
                onClick={() => { startLetter("ف"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ق"
                onClick={() => { startLetter("ق"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ک"
                onClick={() => { startLetter("ک"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="گ"
                onClick={() => { startLetter("گ"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ل"
                onClick={() => { startLetter("ل"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="م"
                onClick={() => { startLetter("م"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ن"
                onClick={() => { startLetter("ن"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="و"
                onClick={() => { startLetter("و"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ه"
                onClick={() => { startLetter("ه"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
            <Button
                className="sideBar-btn"
                type="button"
                text="ی"
                onClick={() => { startLetter("ی"); setAlphabetsClass("alphabets-show"); setFindTextClass("hide") }}
            />
        </div>
    )
}
export default SideBar