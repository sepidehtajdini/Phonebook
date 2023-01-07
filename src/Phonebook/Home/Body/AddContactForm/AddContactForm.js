import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NewContactContext from "../../../NewContactContext";
import MoreNums from "./MoreNums";
import Button from "../../../Shared/Button/Button";
import Input from "../../../Shared/Input/Input";
import "./addContactForm.css";
function AddNewContact() {
    const { newName, setNewName, newLastName, setNewLastName, newNumber, setNewNumber,
        newAge, setNewAge, newEmail, setNewEmail, genderType, setGenderType,
        newAddress, setNewAddress, numbersObj, setNumbersObj
        , fav } = useContext(NewContactContext);
    const [invalidName, setInvalidName] = useState("hide");
    const [invalidLastName, setInvalidLastName] = useState("hide");
    const [invalidNumber, setInvalidNumber] = useState("hide");
    const [invalidAge, setInvalidAge] = useState("hide");
    const [invalidEmail, setInvalidEmail] = useState("hide");
    const [borderName, setBorderName] = useState("");
    const [borderLastName, setBorderLastName] = useState("");
    const [borderNumber, setBorderNumber] = useState("");
    const [borderAge, setBorderAge] = useState("");
    const [borderEmail, setBorderEmail] = useState("");
    const navigate = useNavigate();
    const previousNumbers = [];
    const Obj = {
        fav: false,
        newName: newName,
        newLastName: newLastName,
        newNumber: newNumber,
        numbers: {},
        newAge: newAge,
        newEmail: newEmail,
        genderType: genderType,
        newAddress: newAddress
    }
    for (let i = 0; i < localStorage.length; i++) {
        const contacts = JSON.parse(localStorage.getItem(localStorage.key(i)));
        previousNumbers.push(contacts.newNumber)
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
    function handleNumberInputChange(e) {
        const regExp = /^[0-9]{11}$/.test(e.target.value);
        if (regExp) {
            setNewNumber(e.target.value);
            setInvalidNumber("hide");
            setBorderNumber("")
        }
    }
    function handleEmailInputChange(e) {
        const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(e.target.value)
        if (regExp) {
            setNewEmail(e.target.value);
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
    if (numbersObj !== {}) {
        Object.assign(Obj.numbers, numbersObj);
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
        if (newNumber === "") {
            setInvalidNumber("invalidEntry");
            setBorderNumber("red-border");
            return
        }
        if (previousNumbers.includes(newNumber)) {
            alert("این شماره برای مخاطب دیگری ثبت شده است");
            return
        }
        if (newEmail === "") {
            setNewEmail("");
            setInvalidEmail("hide");
            setBorderEmail("");
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
            localStorage.setItem(newNumber, JSON.stringify(Obj));
            alert(`مخاطب ${newName} ${newLastName} با موفقیت ثبت گردید`);
            navigate("/ContactPage");
        }
    }
    return (
        <form>
            <div style={{ margin: "auto", width: 50 + "%", height: 20 + "px", textAlign: "center" }}>
                تکمیل موارد ستاره دار الزامی است*
            </div>
            <Button
                type="button"
                className="close-btn"
                onClick={() => navigate("/")} />
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
            <Input
                type="tel"
                name="phoneNumber"
                placeholder="شماره تلفن را به همراه پیش شماره وارد کنید"
                onChange={handleNumberInputChange}
                inputClassName={borderNumber}
                labelText="شماره تلفن: *" />
            <div className={invalidNumber}>شماره تلفن باید ۱۱ رقم باشد</div>

            <MoreNums />

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
                labelText="سن:"
            />
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
export default AddNewContact