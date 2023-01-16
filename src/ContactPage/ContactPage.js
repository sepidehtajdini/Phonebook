import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewContactContext from "../NewContactContext";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import MoreNums from "../Home/Body/AddContactForm/MoreNums";
import Numbers from "./Numbers";
import "./contactPage.css";
export default function ContactPage() {
    const { newName, setNewName, newLastName, setNewLastName, newNumber, setNewNumber, newAge,
        setNewAge, newEmail, setNewEmail, newAddress, setNewAddress, genderType,
        setGenderType, user, setUser } = useContext(NewContactContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const [disableReturn, setDisableReturn] = useState(false);
    const [editName, setEditName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [editAge, setEditAge] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editFav, setEditFav] = useState(false);
    const [isNumEmpty, setIsNumEmpty] = useState(true);
    const [lastNum, setLastNum] = useState("");
    const navigate = useNavigate();
    let Obj;
    if (sessionStorage.getItem("edit-contact")) {
        Obj = JSON.parse(sessionStorage.getItem("edit-contact"));
    }
    else if (sessionStorage.getItem("new-contact")) {
        Obj = JSON.parse(sessionStorage.getItem("new-contact"));
    }
    useEffect(() => {
        if (sessionStorage.getItem("edit-contact")) {
            setUser(JSON.parse(sessionStorage.getItem("edit-contact")).user);
            setEditFav(JSON.parse(sessionStorage.getItem("edit-contact")).fav);
            setEditName(JSON.parse(sessionStorage.getItem("edit-contact")).newName);
            setEditLastName(JSON.parse(sessionStorage.getItem("edit-contact")).newLastName);
            setEditNumber(JSON.parse(sessionStorage.getItem("edit-contact")).newNumber);
            setEditAge(JSON.parse(sessionStorage.getItem("edit-contact")).newAge);
            setGenderType(JSON.parse(sessionStorage.getItem("edit-contact")).genderType);
            setNewAddress(JSON.parse(sessionStorage.getItem("edit-contact")).newAddress);
            setLastNum(JSON.parse(sessionStorage.getItem("edit-contact")).newNumber);
        }
        else if (sessionStorage.getItem("new-contact") && newName === "") {
            setUser(JSON.parse(sessionStorage.getItem("new-contact")).user);
            setNewName(JSON.parse(sessionStorage.getItem("new-contact")).newName);
            setNewLastName(JSON.parse(sessionStorage.getItem("new-contact")).newLastName);
            setNewNumber(JSON.parse(sessionStorage.getItem("new-contact")).newNumber);
            setNewAge(JSON.parse(sessionStorage.getItem("new-contact")).newAge);
            setNewEmail(JSON.parse(sessionStorage.getItem("new-contact")).newEmail);
            setGenderType(JSON.parse(sessionStorage.getItem("new-contact")).genderType);
            setNewAddress(JSON.parse(sessionStorage.getItem("new-contact")).newAddress);
            setLastNum(JSON.parse(sessionStorage.getItem("new-contact")).newNumber);
        }
        if (Obj.numbers !== {}) {
            setIsNumEmpty(false)
        }

    }, [])
    function editContact() {
        setDisableReturn(true);
        setIsDisabled(false);
    }
    function saveContactValues() {
        setDisableReturn(false);
        if (sessionStorage.getItem("numbers")) {
            const arrayOfNumbers = JSON.parse(sessionStorage.getItem("numbers"));
            for (let i = 0; i < arrayOfNumbers.length; i++) {
                console.log(arrayOfNumbers[i].length)
                if (arrayOfNumbers[i].length !== 11) {
                    alert("شماره ی وارد شده صحیح نیست");
                    return
                }
            }
        }
        if (sessionStorage.getItem("edit-contact")) {
            if (editAge === "") { setEditAge("") }
            if (lastNum !== editNumber) {
                if (editNumber.length !== 11) {
                    alert("شماره ی وارد شده صحیح نیست");
                    return
                }
                else {
                    localStorage.removeItem(lastNum, JSON.stringify(Obj));
                    Obj = {
                        user: user,
                        fav: editFav,
                        newName: editName,
                        newLastName: editLastName,
                        newNumber: editNumber,
                        numbers: Obj.numbers,
                        newAge: editAge,
                        newEmail: editEmail,
                        genderType: genderType,
                        newAddress: editAddress
                    }
                    localStorage.setItem(editNumber, JSON.stringify(Obj));
                }
            }
        }
        else if (sessionStorage.getItem("new-contact")) {
            if (newAge === "") { setNewAge("") }
            if (lastNum !== newNumber) {
                if (newNumber.length !== 11) {
                    alert("شماره ی وارد شده صحیح نیست");
                    return
                }
                else {
                    localStorage.removeItem(lastNum, JSON.stringify(Obj));
                    Obj = {
                        user: user,
                        fav: false,
                        newName: newName,
                        newLastName: newLastName,
                        newNumber: newNumber,
                        numbers: Obj.numbers,
                        newAge: newAge,
                        newEmail: newEmail,
                        genderType: genderType,
                        newAddress: newAddress
                    }
                    localStorage.setItem(newNumber, JSON.stringify(Obj));
                }
            }
        }
        alert("مشخصات مخاطب ویرایش شد");
        setIsDisabled(true);
        sessionStorage.removeItem("edit-contact");
        sessionStorage.removeItem("new-contact");
        sessionStorage.removeItem("numbers");
        navigate("/ContactsList");
    }
    function deleteContact() {
        if (sessionStorage.getItem("edit-contact")) {
            localStorage.removeItem(editNumber, JSON.stringify(Obj));
            sessionStorage.removeItem("edit-contact");
            sessionStorage.removeItem("numbers");
            alert(`مخاطب ${editLastName} ${editName} حذف شد`);
        }
        else {
            localStorage.removeItem(newNumber, JSON.stringify(Obj));
            sessionStorage.removeItem("new-contact");
            sessionStorage.removeItem("numbers");
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
    function handleChangeNumberValue(e) {
        const regExp = /^[0-9]*$/.test(e.target.value);
        if (regExp) { setEditNumber(e.target.value) }
        else{
            alert("شماره باید لاتین وارد شود");
            return
        }
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
                    sessionStorage.removeItem("numbers");
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
                    value={sessionStorage.getItem("edit-contact") ? editNumber : newNumber}
                    name="number"
                    type="tel"
                    disabled={isDisabled}
                    onChange={handleChangeNumberValue} />
            </div>
            {isNumEmpty === false ?
                <Numbers
                    Obj={Obj}
                    isDisabled={isDisabled} />
                : null}

            {isDisabled === false ?
                <MoreNums
                    Obj={Obj} />
                : null}
            <div className="flex-items">
                <Input
                    labelText="سن: "
                    value={sessionStorage.getItem("edit-contact") ? editAge : newAge}
                    name="age"
                    type="number"
                    disabled={isDisabled}
                    onChange={handleChangeAgeValue} />
            </div>
            <div className="flex-items">
                <Input
                    labelText="ایمیل: "
                    value={sessionStorage.getItem("edit-contact") ? editEmail : newEmail}
                    name="email"
                    type="email"
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
                <a className="phone-btn" href={sessionStorage.getItem("edit-contact") ? `tel:${editNumber}`
                    : `tel:${newNumber}`}>تماس</a>
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