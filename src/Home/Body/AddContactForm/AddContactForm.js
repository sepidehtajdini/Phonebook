import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewContactContext from "../../../NewContactContext";
import Button from "../../../Shared/Button/Button";
import Input from "../../../Shared/Input/Input";
import "./addContactForm.css";
function AddContactForm() {
    const { newName, setNewName, newLastName, setNewLastName, newAge, setNewAge, newEmail,
        setNewEmail, genderType, setGenderType, newAddress, setNewAddress, numbers,
        setNumbers, addNumber } = useContext(NewContactContext);
    const [invalidName, setInvalidName] = useState("hide");
    const [invalidLastName, setInvalidLastName] = useState("hide");
    const [invalidAge, setInvalidAge] = useState("hide");
    const [invalidEmail, setInvalidEmail] = useState("hide");
    const [borderName, setBorderName] = useState("");
    const [borderLastName, setBorderLastName] = useState("");
    const [borderAge, setBorderAge] = useState("");
    const [borderEmail, setBorderEmail] = useState("");
    const [moreNumsList, setMoreNumsList] = useState([]);
    const firstNumber = numbers[0];
    const previousNumbers = [];
    const navigate = useNavigate();
    let Obj;
    useEffect(() => { setNumbers([]) }, [])
    if (sessionStorage.getItem("last-login")) {
        Obj = {
            user: JSON.parse(sessionStorage.getItem("last-login")).username,
            fav: false,
            newName: newName,
            newLastName: newLastName,
            numbers: numbers,
            newAge: newAge,
            newEmail: newEmail,
            genderType: genderType,
            newAddress: newAddress
        }
    }
    else {
        Obj = {
            user: "",
            fav: false,
            newName: newName,
            newLastName: newLastName,
            numbers: numbers,
            newAge: newAge,
            newEmail: newEmail,
            genderType: genderType,
            newAddress: newAddress
        }
    }
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (sessionStorage.getItem("last-login")) {
            const user = JSON.parse(sessionStorage.getItem("last-login")).username;
            if (parsedJson.user === user) {
                previousNumbers.push(parsedJson.numbers);
            }
        }
        else {
            if (parsedJson.user === "") {
                previousNumbers.push(parsedJson.numbers)
            }
        }
    }
    function handleNameInputChange(e) {
        const regExp = /^[ا-ی ]*$/.test(e.target.value);
        if (regExp) {
            setNewName(e.target.value);
            setInvalidName("hide");
            setBorderName("")
        }
    }
    function handleLastNameInputChange(e) {
        const regExp = /^[ا-ی ]*$/.test(e.target.value);
        if (regExp) {
            setNewLastName(e.target.value);
            setInvalidLastName("hide");
            setBorderLastName("")
        }
    }
    function handleNumberInputChange(e, index) {
        const regExp = /^[0-9]*$/.test(e.target.value);
        if (regExp) {
            const list = [...moreNumsList];
            list[index] = e.target.value;
            setMoreNumsList(list);
            if (e.target.value.length === 11) {
                addNumber(e.target.value);
            }
        }
    }
    function handleAddNumClick() {
        setMoreNumsList([...moreNumsList, ""])
    }
    function handleRemoveNumber(e, item) {
        e.preventDefault();
        setNumbers(numbers.filter((number) => number !== item));
        setMoreNumsList(moreNumsList.filter((number) => number !== item))
    }

    function handleEmailInputChange(e) {
        const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(e.target.value)
        if (regExp) {
            setNewEmail(e.target.value);
            setInvalidEmail("hide");
            setBorderEmail("");
        }
        if (newEmail === "") {
            setNewEmail("");
            setInvalidEmail("hide");
            setBorderEmail("");
        }
        else {
            setInvalidEmail("invalidEntry");
            setBorderEmail("red-border");
        }
    }
    function handleAgeInputChange(e) {
        const regExp = /^[0-9]+$/.test(e.target.value);
        if (e.target.value === "") {
            setNewAge(e.target.value);
            setInvalidAge("hide");
            setBorderAge("");
        }
        if (regExp) {
            if (e.target.value.length < 3 && Number(e.target.value) > 1) {
                setNewAge(e.target.value);
                setInvalidAge("hide");
                setBorderAge("");
            }
        }
    }
    function handleAddressChange(e) {
        setNewAddress(e.target.value)
    }
    function addToPhoneBookForm(e) {
        e.preventDefault();
        if (newName === "") {
            setInvalidName("invalidEntry");
            setBorderName("red-border")
            return
        }
        if (newLastName === "") {
            setInvalidLastName("invalidEntry");
            setBorderLastName("red-border")
            return
        }
        if (firstNumber === undefined || firstNumber === "") {
            alert("شماره باید ۱۱ رقمی باشد");
            return
        }
        for (let i = 0; i < moreNumsList.length; i++) {
            if (moreNumsList[i].length !== 11) {
                alert("شماره باید ۱۱ رقمی باشد");
                return
            }
        }
        for (let num of previousNumbers) {
            if (num === firstNumber) {
                alert("این شماره برای مخاطب دیگری ثبت شده است");
                return
            }
        }

        if (newAge.length > 2) {
            setInvalidAge("invalidEntry");
            setBorderAge("red-border");
            return
        }
        if (newAge !== "" && newAge < 1) {
            setInvalidAge("invalidEntry");
            setBorderAge("red-border");
            return;
        }
        else {
            localStorage.setItem(firstNumber, JSON.stringify(Obj));
            sessionStorage.setItem("new-contact", JSON.stringify(Obj));
            sessionStorage.setItem("first-number", Obj.numbers[0])
            alert(`مخاطب ${newName} ${newLastName} با موفقیت ثبت گردید`);
            navigate("/ContactPage");
        }
    }
    return (
        <form>
            <div className="top-form-text">
                تکمیل موارد ستاره دار الزامی است*
            </div>
            <Button
                type="button"
                className="close-btn"
                onClick={() => { navigate("/") }} />
            <Input
                type="text"
                name="name"
                placeholder="نام را وارد کنید"
                onChange={handleNameInputChange}
                inputClassName={borderName}
                labelText="نام: *" />
            <div className={invalidName}>نام را وارد کنید</div>
            <Input
                type="text"
                name="lastName"
                placeholder="نام خانوادگی را وارد کنید"
                onChange={handleLastNameInputChange}
                inputClassName={borderLastName}
                labelText="نام خانوادگی: *" />
            <div className={invalidLastName}>نام خانوادگی را وارد کنید</div>
            <button className="black-btn" type="button" onClick={handleAddNumClick}>اضافه کردن شماره</button>
            {moreNumsList.length >= 1 ? moreNumsList.map((item, index) => {
                return (<div key={index} className="inputClass">
                    <label htmlFor="tel">شماره تلفن: *</label>
                    <input
                        autoFocus
                        type="tel"
                        name="tel"
                        value={item}
                        key={item}
                        onChange={(e) => handleNumberInputChange(e, index)} />
                    <Button
                        type="button"
                        text="حذف"
                        className="delete-btn hazf"
                        onClick={(e) => handleRemoveNumber(e, item)} />
                </div>)
            }) : null}
            <Input
                type="email"
                name="email"
                placeholder="ایمیل را وارد کنید"
                onChange={handleEmailInputChange}
                inputClassName={borderEmail}
                labelText="ایمیل:" />
            <div className={invalidEmail}>ایمیل غیرمجاز است</div>

            <div className="flex-items">
                <label>جنسیت: </label>
                <div className="gender-container">
                    <Input
                        labelText="خانم"
                        type="radio"
                        name="woman"
                        onChange={() => setGenderType("خانم")}
                        checked={genderType === "خانم" ? true : false} />
                    <Input
                        labelText="آقا"
                        type="radio"
                        name="man"
                        onChange={() => setGenderType("آقا")}
                        checked={genderType === "آقا" ? true : false} />
                </div>
            </div>
            <Input
                type="number"
                name="age"
                placeholder="سن را وارد کنید"
                inputClassName={borderAge}
                onChange={handleAgeInputChange}
                labelText="سن:" />
            <div className={invalidAge}>
                سن مجاز بین ۱ تا ۱۰۰ است
            </div>
            <div className="inputClass">
                <label htmlFor="address">نشانی:</label>
                <textarea name="address" placeholder="نشانی را وارد کنید"
                    onChange={handleAddressChange} />
            </div>
            <div className="submit-form">
                <Button
                    text="ثبت"
                    type="submit"
                    className="green-btn"
                    onClick={addToPhoneBookForm} />
            </div>
        </form>
    )
}
export default AddContactForm