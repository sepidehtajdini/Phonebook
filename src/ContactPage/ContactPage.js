import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewContactContext from "../NewContactContext";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import "./contactPage.css";
export default function ContactPage() {
    const { newName, setNewName, newLastName, setNewLastName, numbers, setNumbers, newAge,
        setNewAge, newEmail, setNewEmail, newAddress, setNewAddress, genderType,
        setGenderType } = useContext(NewContactContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const [disableReturn, setDisableReturn] = useState(false);
    const [editName, setEditName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [moreNumsList, setMoreNumsList] = useState([]);
    let firstNumber = sessionStorage.getItem("first-number");
    const numbersExceptFirstNumber = [];
    const navigate = useNavigate();
    const previousNumbers = [];
    let user;
    if (sessionStorage.getItem("last-login")) {
        user = JSON.parse(sessionStorage.getItem("last-login")).username
    }
    else {
        user = ""
    }
    let Obj;
    for (let i = 1; i < numbers.length; i++) {
        numbersExceptFirstNumber.push(numbers[i]);
    }
    for (let i = 0; i < localStorage.length; i++) {
        const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (sessionStorage.getItem("last-login")) {
            if (parsedJson.user === user) {
                previousNumbers.push(parsedJson.numbers)
            }
        }
        else {
            if (parsedJson.user === "") {
                previousNumbers.push(parsedJson.numbers)
            }
        }
    }
    if (sessionStorage.getItem("edit-contact")) {
        Obj = {
            user: user,
            fav: JSON.parse(sessionStorage.getItem("edit-contact")).fav,
            newName: editName,
            newLastName: editLastName,
            numbers: numbers,
            newAge: editAge,
            newEmail: editEmail,
            genderType: genderType,
            newAddress: editAddress
        }
        console.log(Obj)
    }
    else if (sessionStorage.getItem("new-contact")) {
        Obj = {
            user: user,
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
    useEffect(() => {
        if (sessionStorage.getItem("edit-contact")) {
            setEditName(JSON.parse(sessionStorage.getItem("edit-contact")).newName);
            setEditLastName(JSON.parse(sessionStorage.getItem("edit-contact")).newLastName);
            setNumbers(JSON.parse(sessionStorage.getItem("edit-contact")).numbers);
            setEditAge(JSON.parse(sessionStorage.getItem("edit-contact")).newAge);
            setGenderType(JSON.parse(sessionStorage.getItem("edit-contact")).genderType);
            setNewAddress(JSON.parse(sessionStorage.getItem("edit-contact")).newAddress);
        }
        else if (sessionStorage.getItem("new-contact") && newName === "") {
            setNewName(JSON.parse(sessionStorage.getItem("new-contact")).newName);
            setNewLastName(JSON.parse(sessionStorage.getItem("new-contact")).newLastName);
            setNumbers(JSON.parse(sessionStorage.getItem("new-contact")).numbers);
            setNewAge(JSON.parse(sessionStorage.getItem("new-contact")).newAge);
            setNewEmail(JSON.parse(sessionStorage.getItem("new-contact")).newEmail);
            setGenderType(JSON.parse(sessionStorage.getItem("new-contact")).genderType);
            setNewAddress(JSON.parse(sessionStorage.getItem("new-contact")).newAddress);
        }
    }, [])
    function editContact() {
        setDisableReturn(true);
        setIsDisabled(false);
    }
    function saveContactValues() {
        setDisableReturn(false);
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i].length !== 11 && numbers[i] !== "") {
                alert("شماره ی وارد شده صحیح نیست");
                return
            }
        }
        if (sessionStorage.getItem("edit-contact")) {
            if (editAge === "") { setEditAge("") }
            Obj = {
                user: user,
                fav: JSON.parse(sessionStorage.getItem("edit-contact")).fav,
                newName: editName,
                newLastName: editLastName,
                numbers: Obj.numbers,
                newAge: editAge,
                newEmail: editEmail,
                genderType: genderType,
                newAddress: editAddress
            }
            if (firstNumber !== Obj.numbers[0]) {
                localStorage.removeItem(firstNumber, sessionStorage.getItem("edit-contact"));
                localStorage.setItem(Obj.numbers[0], JSON.stringify(Obj));
            }
            else if (firstNumber === Obj.numbers[0]) {
                localStorage.setItem(firstNumber, JSON.stringify(Obj));
            }
        }
        else if (sessionStorage.getItem("new-contact")) {
            if (newAge === "") { setNewAge("") }
            Obj = {
                user: user,
                fav: false,
                newName: newName,
                newLastName: newLastName,
                numbers: Obj.numbers,
                newAge: newAge,
                newEmail: newEmail,
                genderType: genderType,
                newAddress: newAddress
            }
            if (firstNumber !== Obj.numbers[0]) {
                localStorage.removeItem(firstNumber, sessionStorage.getItem("new-contact"));
                localStorage.setItem(Obj.numbers[0], JSON.stringify(Obj));
            }
            else if (firstNumber === Obj.numbers[0]) {
                localStorage.setItem(firstNumber, JSON.stringify(Obj));
            }
        }
        alert("مشخصات مخاطب ویرایش شد");
        setIsDisabled(true);
        navigate("/ContactsList");
        sessionStorage.removeItem("edit-contact");
        sessionStorage.removeItem("new-contact");
        sessionStorage.removeItem("first-number");
    }
    function deleteContact() {
        if (sessionStorage.getItem("edit-contact")) {
            localStorage.removeItem(numbers[0], JSON.stringify(Obj));
            sessionStorage.removeItem("edit-contact");
            sessionStorage.removeItem("first-number");
            alert(`مخاطب ${editLastName} ${editName} حذف شد`);
        }
        else {
            localStorage.removeItem(numbers[0], JSON.stringify(Obj));
            sessionStorage.removeItem("new-contact");
            sessionStorage.removeItem("first-number");
            alert(`مخاطب ${newLastName} ${newName} حذف شد`);
        }
        navigate("/");
    }
    function handleChangeNameValue(e) {
        const regExp = /^[ا-ی ]*$/.test(e.target.value);
        if (regExp) {
            sessionStorage.getItem("edit-contact")
                ? setEditName(e.target.value)
                : setNewName(e.target.value)
        }
    }

    function handleChangeLastNameValue(e) {
        const regExp = /^[ا-ی ]*$/.test(e.target.value);
        if (regExp) {
            sessionStorage.getItem("edit-contact")
                ? setEditLastName(e.target.value)
                : setNewLastName(e.target.value)
        }
    }
    function handleChangeNumberValue(e, number) {
        const regExp = /^[0-9]*$/.test(e.target.value);
        if (regExp) {
            const otherNums = numbers.filter((item) => item !== number);
            if (number === Obj.numbers[0]) {
                if (e.target.value.length === 11) {
                    const num = [e.target.value];
                    Object.assign(Obj.numbers, num.concat(otherNums));
                }
            }
            else {
                if (e.target.value.length === 11) {
                    const num = [e.target.value];
                    Object.assign(Obj.numbers, otherNums.concat(num));
                }
            }
        }
        else {
            alert("شماره باید لاتین وارد شود");
            return
        }
    }
    function handleAddNumClick() {
        setNumbers([...numbers, ""]);
    }
    function handleRemoveNumber(e, number) {
        e.preventDefault();
        setNumbers(numbers.filter((item) => item !== number));
        setMoreNumsList(moreNumsList.filter((item) => item !== number))
    }
    function handleChangeAgeValue(e) {
        const regExp = /^[0-9]*$/.test(e.target.value);
        if (regExp) {
            sessionStorage.getItem("edit-contact")
                ? setEditAge(e.target.value)
                : setNewAge(e.target.value)
        }
    }
    function handleChangeEmailValue(e) {
        const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(e.target.value)
        if (regExp) {
            sessionStorage.getItem("edit-contact")
                ? setEditEmail(e.target.value)
                : setNewEmail(e.target.value)
        }
    }
    function handleChangeAddressValue(e) {
        sessionStorage.getItem("edit-contact")
            ? setEditAddress(e.target.value)
            : setNewAddress(e.target.value)
    }
    return (
        <form className="contact_container">
            <Button
                disabled={disableReturn}
                type="button"
                className="close-btn"
                onClick={() => {
                    sessionStorage.removeItem("edit-contact");
                    sessionStorage.removeItem("new-contact");
                    sessionStorage.removeItem("first-number");
                    navigate("/")
                }} />
            <h2>مشخصات مخاطب</h2>
            <div className="flex-items">
                <Input
                    labelText="نام:"
                    value={sessionStorage.getItem("edit-contact") ? editName : newName}
                    name="name"
                    type="text"
                    disabled={isDisabled}
                    onChange={handleChangeNameValue} />
            </div>
            <div className="flex-items">
                <Input
                    labelText="نام خانوادگی: "
                    value={sessionStorage.getItem("edit-contact") ? editLastName : newLastName}
                    name="lastname"
                    type="text"
                    disabled={isDisabled}
                    onChange={handleChangeLastNameValue} />
            </div>
            <div className="flex-items">
                <Input
                    labelText="شماره تلفن: "
                    value={isDisabled ? numbers[0] : Input.value}
                    name="number"
                    type="tel"
                    disabled={isDisabled}
                    onChange={(e) => handleChangeNumberValue(e, numbers[0])} />
            </div>
            {numbersExceptFirstNumber !== [] ?
                numbersExceptFirstNumber.map((number) =>
                    <div className="flex-items" key={number}>
                        <div className="inputClass">
                            <label htmlFor="number">شماره تلفن: </label>
                            <input
                                value={isDisabled ? number : Input.value}
                                name="number"
                                type="tel"
                                placeholder="شماره را به همراه پیش شماره وارد کنید"
                                disabled={isDisabled}
                                onChange={(e) => handleChangeNumberValue(e, number)} />
                            <Button
                                type="button"
                                text="حذف"
                                disabled={isDisabled}
                                className="delete-btn hazf"
                                onClick={(e) => handleRemoveNumber(e, number)} />
                        </div>
                    </div>) : null}
            {isDisabled === false ?
                <Button
                    type="button"
                    className="black-btn"
                    onClick={handleAddNumClick}
                    text="افزودن شماره" />
                : null}
            <div className="flex-items">
                <Input
                    labelText="سن: "
                    value={sessionStorage.getItem("edit-contact") ? editAge : newAge}
                    name="age"
                    type="number"
                    placeholder="سن را وارد کنید"
                    disabled={isDisabled}
                    onChange={handleChangeAgeValue} />
            </div>
            <div className="flex-items">
                <Input
                    labelText="ایمیل: "
                    value={sessionStorage.getItem("edit-contact") ? editEmail : newEmail}
                    name="email"
                    type="email"
                    placeholder="something@sample.com"
                    disabled={isDisabled}
                    onChange={handleChangeEmailValue} />
            </div>
            <div className="flex-items">
                <label>جنسیت:</label>
                <div className="gender-container">
                    <Input
                        labelText="خانم"
                        name="woman"
                        type="radio"
                        disabled={isDisabled}
                        checked={genderType === "خانم" ? true : false}
                        onChange={() => setGenderType("خانم")} />
                    <Input
                        labelText="آقا"
                        name="man"
                        type="radio"
                        disabled={isDisabled}
                        checked={genderType === "آقا" ? true : false}
                        onChange={() => setGenderType("آقا")} />
                </div>
            </div>
            <div className="flex-items">
                <label htmlFor="address">نشانی: </label>
                <textarea
                    name="address"
                    disabled={isDisabled}
                    value={sessionStorage.getItem("edit-contact") ? editAddress : newAddress}
                    onChange={handleChangeAddressValue} />
            </div>
            <div className="mailto-tel flex-items">
                <a className="email-btn" href={sessionStorage.getItem("edit-contact") ? `mailto:${editEmail}`
                    : `mailto:${newEmail}`}>ایمیل</a>
                <a className="phone-btn" href={`tel:${Obj.numbers[0]}`}>تماس</a>
            </div>
            <div className="flex-items">
                <Button
                    className="delete-btn"
                    text="ویرایش"
                    type="button"
                    disabled={!isDisabled}
                    onClick={editContact} />
                <Button
                    className="green-btn"
                    text="ذخیره"
                    type="button"
                    disabled={isDisabled}
                    onClick={saveContactValues} />
                <Button
                    className="delete-btn"
                    text="حذف"
                    type="button"
                    disabled={isDisabled}
                    onClick={deleteContact} />
            </div>
        </form >
    )
}