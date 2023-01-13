import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewContactContext from "../NewContactContext";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import MoreNums from "../Home/Body/AddContactForm/MoreNums";
import "./contactPage.css";
function ContactPage() {
    const { newName, setNewName, newLastName, setNewLastName, newNumber, setNewNumber, newAge,
        setNewAge, newEmail, setNewEmail, newAddress, setNewAddress, genderType,
        setGenderType, setNumbersObj, user, theme
    } = useContext(NewContactContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const [disableReturn, setDisableReturn] = useState(false);
    const [editName, setEditName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [editAge, setEditAge] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editFav, setEditFav] = useState(false);
    const navigate = useNavigate();
    let Obj;
    if (sessionStorage.getItem("edit-contact") && editName === "") {
        Obj = JSON.parse(sessionStorage.getItem("edit-contact"));
        setEditFav(JSON.parse(sessionStorage.getItem("edit-contact")).fav)
        setEditName(JSON.parse(sessionStorage.getItem("edit-contact")).newName)
        setEditLastName(JSON.parse(sessionStorage.getItem("edit-contact")).newLastName)
        setEditNumber(JSON.parse(sessionStorage.getItem("edit-contact")).newNumber)
        setEditAge(JSON.parse(sessionStorage.getItem("edit-contact")).newAge)
        setEditEmail(JSON.parse(sessionStorage.getItem("edit-contact")).newEmail)
        setGenderType(JSON.parse(sessionStorage.getItem("edit-contact")).genderType)
        setEditAddress(JSON.parse(sessionStorage.getItem("edit-contact")).newAddress)
    }
    else if (sessionStorage.getItem("edit-contact") && editName !== "") {
        if (sessionStorage.getItem("numbers")) {
            Obj = {
                user: user.username,
                fav: editFav,
                newName: editName,
                newLastName: editLastName,
                newNumber: editNumber,
                numbers: JSON.parse(sessionStorage.getItem("numbers")).numbers,
                newAge: editAge,
                newEmail: editEmail,
                genderType: genderType,
                newAddress: editAddress
            }
        }
        else {
            Obj = {
                user: user.username,
                fav: editFav,
                newName: editName,
                newLastName: editLastName,
                newNumber: editNumber,
                numbers: {},
                newAge: editAge,
                newEmail: editEmail,
                genderType: genderType,
                newAddress: editAddress
            }
        }
    }
    else if (sessionStorage.getItem("new-contact") && newName === "") {
        Obj = JSON.parse(sessionStorage.getItem("new-contact"));
        setNewName(JSON.parse(sessionStorage.getItem("new-contact")).newName);
        setNewLastName(JSON.parse(sessionStorage.getItem("new-contact")).newLastName);
        setNewNumber(JSON.parse(sessionStorage.getItem("new-contact")).newNumber);
        setNewAge(JSON.parse(sessionStorage.getItem("new-contact")).newAge);
        setNewEmail(JSON.parse(sessionStorage.getItem("new-contact")).newEmail);
        setGenderType(JSON.parse(sessionStorage.getItem("new-contact")).genderType);
        setNewAddress(JSON.parse(sessionStorage.getItem("new-contact")).newAddress);
    }
    else if (sessionStorage.getItem("new-contact") && newName !== "") {
        if (sessionStorage.getItem("numbers")) {
            Obj = {
                user: user.username,
                fav: false,
                newName: newName,
                newLastName: newLastName,
                newNumber: newNumber,
                numbers: JSON.parse(sessionStorage.getItem("numbers")).numbers,
                newAge: newAge,
                newEmail: newEmail,
                genderType: genderType,
                newAddress: newAddress
            }
        }
        else {
            Obj = {
                user: user.username,
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
        }
    }
    function editContact() {
        setDisableReturn(true);
        setIsDisabled(false);
    }
    function saveContactValues() {
        setDisableReturn(false);
        if (sessionStorage.getItem("edit-contact")) {
            if (editNumber.length < 11 || editNumber.length > 11) {
                alert("شماره را به همراه پیش شماره وارد کنید");
                return
            }
            if (editAge === "") { setEditAge("") }
            localStorage.setItem(editNumber, JSON.stringify(Obj));
            sessionStorage.removeItem("numbers");
        }
        else {
            if (newNumber.length < 11) {
                alert("شماره را به همراه پیش شماره وارد کنید");
                return
            }
            if (newAge === "") { setNewAge("") }
            localStorage.setItem(newNumber, JSON.stringify(Obj));
            sessionStorage.removeItem("numbers");
        }
        alert("مشخصات مخاطب ویرایش شد");
        setIsDisabled(true);
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
        if (regExp) {
            sessionStorage.getItem("edit-contact")
                ? setEditNumber(e.target.value)
                : setNewNumber(e.target.value)
        }
    }
    function handleChangeMoreNums(e) {
        const regExp = /^[0-9]*$/.test(e.target.value);
        if (regExp) { setNumbersObj(e.target.value) }
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
        <div className={theme === "pinkTheme" ? "container pinkContainer" : "container oliveContainer"}>
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
                    }}
                />
                <h2>مشخصات مخاطب</h2>
                <div className="flex-items">
                    <Input
                        labelText="نام:"
                        value={
                            sessionStorage.getItem("edit-contact") ? editName : newName
                        }
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
                <div className="flex-items">
                    {Obj.numbers !== {} ?
                        Object.values(Obj.numbers).map((item) =>
                            <Input
                                key={item}
                                value={item}
                                labelText="شماره تلفن:"
                                name="moreNumbers"
                                type="tel"
                                disabled={isDisabled}
                                onChange={handleChangeMoreNums} />)
                        : null}
                </div>
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
        </div>
    )
}
export default ContactPage
