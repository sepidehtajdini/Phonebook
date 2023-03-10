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
                text="??????"
                type="button"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="??"
                type="button"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="??"
                type="button"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="??"
                type="button"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                text="??"
                type="button"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
            <Button
                className={theme === "pinkTheme" ? "pink-sideBar-btn" : "olive-sideBar-btn"}
                type="button"
                text="??"
                onClick={() => {
                    startLetter("??"); setFindTextClass("hide");
                    setAlphabetsClass("alphabets-show")
                }} />
        </div>
    )
}
export default SideBar