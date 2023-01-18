import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../../../Shared/Button/Button";
import Input from "../../../Shared/Input/Input";
import LoggedIn from "./Login/LoggedIn";
export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [invalidPass, setInvalidPass] = useState("hide");
    const navigate = useNavigate();
    const allUsers = [];
    function handleSubmit(e) {
        e.preventDefault();
        if (username === "" || password === "" || repass === "") {
            alert("لطفاٌ همه ی قسمتها را تکمیل کنید")
            return
        }
        if (password !== repass) {
            setInvalidPass("invalidEntry");
            return
        }
        else {
            setInvalidPass("hide");
            if (localStorage.getItem("user-pass")) {
                const lastUser = JSON.parse(localStorage.getItem("user-pass"));
                for (let item of lastUser) {
                    allUsers.push(item);
                }
                for (let item of allUsers) {
                    if (item.username === username) {
                        alert("این نام کاربری قبلا ثبت شده است");
                        return
                    }
                }
                allUsers.push({ username, password });
                localStorage.setItem("user-pass", JSON.stringify(allUsers));
                alert(`${username} عضویت شما با موفقیت انجام شد`);
                navigate("/Login");
            }
            else {
                allUsers.push({ username, password });
                localStorage.setItem("user-pass", JSON.stringify(allUsers));
                alert(`${username} عضویت شما با موفقیت انجام شد`);
                navigate("/Login");
                console.log(allUsers)
            }
        }
    }
    return (
        <div>
            {sessionStorage.getItem("last-login") ?
                <LoggedIn />
                :
                <form>
                    <div className="top-form-text">عضویت</div>
                    <Button
                        className="close-btn"
                        onClick={() => navigate("/")} />

                    <Input
                        labelText="نام کاربری :"
                        name="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="نام کاربری را وارد کنید" />

                    <Input
                        labelText="گذر واژه :"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="گذر واژه را وارد کنید" />

                    <Input
                        labelText="تکرار گذر واژه:"
                        name="repass"
                        type="password"
                        onChange={(e) => setRepass(e.target.value)}
                        placeholder="گذر واژه را وارد کنید" />

                    <div className={invalidPass}>گذر واژه صحیح وارد نشده است</div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            text="ثبت"
                            onClick={handleSubmit}
                            type="submit"
                            className="green-btn" />
                        <Button
                            onClick={() => navigate("/Login")}
                            className="black-btn"
                            text="عضو هستید؟ کلیک کنید" />
                    </div>
                </form>
            }
        </div>)
}