import "./sidebar.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Shared/Button/Button";
import SearchContext from "../../../SearchContext";
import NewContactContext from "../../../NewContactContext";
function SideBar() {
    const navigate = useNavigate();
    const { theme } = useContext(NewContactContext);
    const { setFindTextClass, setAlphabetsClass, setPair, setOutlet } = useContext(SearchContext);
    let contacts = [];
    let keyValues = [];
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (sessionStorage.getItem("last-login")) {
            const user = JSON.parse(sessionStorage.getItem("last-login")).username;
            if (parsedJson.user === user) {
                contacts.push(parsedJson.newLastName + " " + parsedJson.newName);
                keyValues.push(`${parsedJson.newLastName + " " + parsedJson.newName}:
                <div style="background-color:lightgray;border-radius:.4rem;text-align:center">
                    ${Object.values(parsedJson.numbers).map((num) =>
                    `<div>${num}</div>`)}
                    <div>${parsedJson.newEmail}</div>
                </div> `)
            }
        }
        else {
            if (parsedJson.user === "") {
                contacts.push(parsedJson.newLastName + " " + parsedJson.newName);
                keyValues.push(`${parsedJson.newLastName + " " + parsedJson.newName}:
                <div style="background-color:lightgray;border-radius:.4rem;text-align:center">
                    ${Object.values(parsedJson.numbers).map((num) =>
                    `<div>${num}</div>`)}
                    <div>${parsedJson.newEmail}</div>
                </div> `)
            }
        }
    }

    function startLetter(letter) {
        const contactsOfThisLetter = keyValues.filter((contact) => contact.startsWith(letter))
        const listOfKeyValues = contactsOfThisLetter.toString().replaceAll(",", '');
        setPair(`${listOfKeyValues}`)
    }
    return (
        <div>
            <Button
                className="close-btn"
                type="button"
                onClick={() => { setOutlet(""); setAlphabetsClass("hide"); navigate("/") }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="الف"
                type="button"
                onClick={() => {
                    startLetter("ا"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="ب"
                type="button"
                onClick={() => {
                    startLetter("ب"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="پ"
                type="button"
                onClick={() => {
                    startLetter("پ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="ت"
                type="button"
                onClick={() => {
                    startLetter("ت"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="ث"
                type="button"
                onClick={() => {
                    startLetter("ث"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ج"
                onClick={() => {
                    startLetter("ج"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="چ"
                onClick={() => {
                    startLetter("چ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ح"
                onClick={() => {
                    startLetter("ح"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="خ"
                onClick={() => {
                    startLetter("خ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="د"
                onClick={() => {
                    startLetter("د"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ذ"
                onClick={() => {
                    startLetter("ذ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ر"
                onClick={() => {
                    startLetter("ر"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ز"
                onClick={() => {
                    startLetter("ز"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ژ"
                onClick={() => {
                    startLetter("ژ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="س"
                onClick={() => {
                    startLetter("س"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ش"
                onClick={() => {
                    startLetter("ش"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ص"
                onClick={() => {
                    startLetter("ص"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ض"
                onClick={() => {
                    startLetter("ض"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ط"
                onClick={() => {
                    startLetter("ط"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ظ"
                onClick={() => {
                    startLetter("ظ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ع"
                onClick={() => {
                    startLetter("ع"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="غ"
                onClick={() => {
                    startLetter("غ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ف"
                onClick={() => {
                    startLetter("ف"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ق"
                onClick={() => {
                    startLetter("ق"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ک"
                onClick={() => {
                    startLetter("ک"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="گ"
                onClick={() => {
                    startLetter("گ"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ل"
                onClick={() => {
                    startLetter("ل"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="م"
                onClick={() => {
                    startLetter("م"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ن"
                onClick={() => {
                    startLetter("ن"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="و"
                onClick={() => {
                    startLetter("و"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ه"
                onClick={() => {
                    startLetter("ه"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="ی"
                onClick={() => {
                    startLetter("ی"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
        </div>
    )
}
export default SideBar