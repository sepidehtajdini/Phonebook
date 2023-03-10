import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../Shared/Input/Input";
import Button from "../../../../Shared/Button/Button";
import NewContactContext from "../../../../NewContactContext";
import "./loginForm.css";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [borderUsername, setBorderUsername] = useState("");
    const [borderPassword, setBorderPassword] = useState("");
    const [invalidUsername, setInvalidUsername] = useState("hide");
    const [invalidPassword, setInvalidPassword] = useState("hide");
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        if (localStorage.getItem("user-pass")) {
            const parsedJson = JSON.parse(localStorage.getItem("user-pass"));
            const database = parsedJson.filter((item) => item.username === username);
            const userEntry = { username: username, password: password };
            for (let item of database) {
                if (item.username === userEntry.username) {
                    setBorderUsername("");
                    setInvalidUsername("hide");
                }
                else if (item.username !== userEntry.username) {
                    setBorderUsername("red-border");
                    setInvalidUsername("invalidEntry");
                    return
                }
                if (item.password === userEntry.password) {
                    setBorderPassword("");
                    setInvalidPassword("hide");
                }
                else if (item.password !== userEntry.password) {
                    setBorderPassword("red-border");
                    setInvalidPassword("invalidEntry");
                    return
                }
                if (item.username === userEntry.username && item.password === userEntry.password) {
                    setBorderPassword("");
                    setInvalidPassword("hide");
                    sessionStorage.setItem("last-login", JSON.stringify(userEntry));
                    alert(`?????? ?????????? ${username}`);
                    navigate("/");
                    return
                }

            }
        }
        else {
            alert("?????? ???????????? ???????? ??????????")
            return
        }
    }
    return (
        <form className="login-form">
            <div className="top-form-text">????????</div>
            <Button
                className="close-btn"
                onClick={() => navigate("/")} />
            <Input
                name="username"
                type="text"
                labelText="?????? ????????????"
                inputClassName={borderUsername}
                onChange={(e) => setUsername(e.target.value)} />
            <div className={invalidUsername}>?????? ???????????? ???????? ????????</div>
            <Input
                name="password"
                type="password"
                labelText="?????? ????????"
                inputClassName={borderPassword}
                onChange={(e) => setPassword(e.target.value)} />
            <div className={invalidPassword}>?????? ???????? ???????? ????????</div>
            <Button
                text="????????"
                type="submit"
                className="green-btn"
                onClick={handleSubmit} />
        </form>
    )
}