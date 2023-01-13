import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../Shared/Input/Input";
import Button from "../../../../Shared/Button/Button";
import NewContactContext from "../../../../NewContactContext";
import "./loginForm.css";
export default function Login() {
    const { setIsLoggedIn, setUser } = useContext(NewContactContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [borderUsername, setBorderUsername] = useState("");
    const [borderPassword, setBorderPassword] = useState("");
    const [invalidUsername, setInvalidUsername] = useState("hide");
    const [invalidPassword, setInvalidPassword] = useState("hide");
    const navigate = useNavigate();
    const parsedJson = JSON.parse(localStorage.getItem("user-pass"));
    function handleUsernameChange(e) { setUsername(e.target.value) }
    function handlePasswordChange(e) { setPassword(e.target.value) }
    function handleSubmit(e) {
        e.preventDefault();
        const database = parsedJson.filter((item) => item.username === username);
        const userEntry = { username: username, password: password };
        for (let item of database) {
            if (item.username === userEntry.username) {
                setBorderUsername("");
                setInvalidUsername("hide");
            }
            else {
                setBorderUsername("red-border");
                setInvalidUsername("invalidEntry");
                return
            }
            if (item.password === userEntry.password) {
                setBorderPassword("");
                setInvalidPassword("hide");
            }
            else {
                setBorderPassword("red-border");
                setInvalidPassword("invalidEntry");
                return
            }
            if (item.username === userEntry.username && item.password === userEntry.password) {
                setBorderPassword("");
                setInvalidPassword("hide");
                setIsLoggedIn(true);
                setUser(userEntry);
                sessionStorage.setItem("last-login", JSON.stringify(userEntry));
                alert(`خوش آمدید ${username}`);
                navigate("/");
                return
            }
        }
        alert("نام کاربری وجود ندارد")
    }
    return (
        <form className="login-form">
            <div className="top-form-text">ورود</div>
            <Button
                className="close-btn"
                onClick={() => navigate("/")} />
            <Input
                name="username"
                type="text"
                labelText="نام کاربری"
                inputClassName={borderUsername}
                onChange={handleUsernameChange} />
            <div className={invalidUsername}>نام کاربری صحیح نیست</div>
            <Input
                name="password"
                type="password"
                labelText="گذر واژه"
                inputClassName={borderPassword}
                onChange={handlePasswordChange} />
            <div className={invalidPassword}>گذر واژه صحیح نیست</div>
            <Button
                text="ورود"
                type="submit"
                className="green-btn"
                onClick={handleSubmit} />
        </form>
    )
}