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
        setGenderType,
        editing, setEditing, editName, editLastName, editNumber, editAge,
        editEmail, editAddress, editFav, setEditName, setEditLastName, setEditNumber,
        setEditAge, setEditEmail, setEditAddress
    } = useContext(NewContactContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const [disableReturn, setDisableReturn] = useState(false);
    const navigate = useNavigate();
    let Obj;
    {
        editing ? Obj = {
            fav: editFav,
            newName: editName,
            newLastName: editLastName,
            newNumber: editNumber,
            numbers: JSON.parse(localStorage.getItem(editNumber)).numbers,
            newAge: editAge,
            newEmail: editEmail,
            genderType: genderType,
            newAddress: editAddress
        }
            : Obj = {
                fav: false,
                newName: newName,
                newLastName: newLastName,
                newNumber: newNumber,
                numbers: JSON.parse(localStorage.getItem(newNumber)).numbers,
                newAge: newAge,
                newEmail: newEmail,
                genderType: genderType,
                newAddress: newAddress
            }
    }
    function editContact() {
        setDisableReturn(true);
        // editing ? localStorage.removeItem(editNumber, JSON.stringify(Obj))
        //     : localStorage.removeItem(newNumber, JSON.stringify(Obj));
        setIsDisabled(false);
    }
    function saveContactValues() {
        setDisableReturn(false);
        if (editing) {
            if (editAge === "") { setEditAge("") }
            localStorage.setItem(editNumber, JSON.stringify(Obj));
        }
        else {
            if (newAge === "") { setNewAge("") }
            localStorage.setItem(newNumber, JSON.stringify(Obj));
        }
        alert("مشخصات مخاطب ویرایش شد");
        setIsDisabled(true);
    }
    function deleteContact() {
        if (editing) {
            localStorage.removeItem(editNumber, JSON.stringify(Obj));
            alert(`مخاطب ${editLastName} ${editName} حذف شد`);
        }
        else {
            localStorage.removeItem(newNumber, JSON.stringify(Obj));
            alert(`مخاطب ${newLastName} ${newName} حذف شد`);
        }
        navigate("/");
    }
    function handleChangeNameValue(e) {
        const regExp = /^[ا-ی ]*$/.test(e.target.value);
        if (regExp) { editing ? setEditName(e.target.value) : setNewName(e.target.value) }
    }

    function handleChangeLastNameValue(e) {
        const regExp = /^[ا-ی ]*$/.test(e.target.value);
        if (regExp) { editing ? setEditLastName(e.target.value) : setNewLastName(e.target.value) }
    }
    function handleChangeNumberValue(e) {
        const regExp = /^[0-9]{11}$/.test(e.target.value);
        if (regExp) {
            editing ? setEditNumber(e.target.value) : setNewNumber(e.target.value)
        }
    }
    function handleChangeAgeValue(e) {
        const regExp = /^[0-9]*$/.test(e.target.value);
        if (regExp) { editing ? setEditAge(e.target.value) : setNewAge(e.target.value) }
    }
    function handleChangeEmailValue(e) {
        const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(e.target.value)
        if (regExp) {
            editing ? setEditEmail(e.target.value) : setNewEmail(e.target.value)
        }
    }
    function handleChangeAddressValue(e) {
        editing ? setEditAddress(e.target.value) : setNewAddress(e.target.value)
    }
    return (
        <form className="contact_container">
            <div></div>
            <Button
                disabled={disableReturn}
                type="button"
                className="close-btn"
                onClick={() => { setEditing(false); navigate("/") }}
            />
            <h2>مشخصات مخاطب</h2>
            <div className="flex-items">
                <Input
                    labelText="نام:"
                    value={editing ? editName : newName}
                    name="name"
                    type="text"
                    disabled={isDisabled}
                    onChange={handleChangeNameValue} />
            </div>
            <div className="flex-items">
                <Input
                    labelText="نام خانوادگی: "
                    value={editing ? editLastName : newLastName}
                    name="lastname"
                    type="text"
                    disabled={isDisabled}
                    onChange={handleChangeLastNameValue} />
            </div>
            <div className="flex-items">
                <Input
                    labelText="شماره تماس: "
                    value={editing ? editNumber : newNumber}
                    name="number"
                    type="tel"
                    disabled={isDisabled}
                    onChange={handleChangeNumberValue} />
            </div>
            <div>
                {Obj.numbers !== {} ?
                    Object.values(Obj.numbers).map((item) =>
                        <Input
                            key={item}
                            value={item}
                            name="moreNumbers"
                            type="tel"
                            disabled={isDisabled}
                            onChange={() => console.log("change")} />)
                    : null}
            </div>
            {isDisabled === false ? <MoreNums /> : null}
            <div className="flex-items">
                <Input
                    labelText="سن: "
                    value={editing ? editAge : newAge}
                    name="age"
                    type="number"
                    disabled={isDisabled}
                    onChange={handleChangeAgeValue} />
            </div>
            <div className="flex-items">
                <Input
                    labelText="ایمیل: "
                    value={editing ? editEmail : newEmail}
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
                    value={editing ? editAddress : newAddress}
                    onChange={handleChangeAddressValue} />
            </div>
            <div className="mailto-tel flex-items">
                <a className="email-btn" href={editing ? `mailto:${editEmail}`
                    : `mailto:${newEmail}`}>ایمیل</a>
                <a className="phone-btn" href={editing ? `tel:${editNumber}`
                    : `tel:${newNumber}`}>تماس</a>
            </div>
            <div className="flex-items">
                <Button className="delete-btn" text="ویرایش" disabled={!isDisabled} onClick={editContact}
                    type="button" />
                <Button className="green-btn" disabled={isDisabled} text="ذخیره" type="button"
                    onClick={saveContactValues} />
                <Button className="delete-btn" text="حذف" disabled={isDisabled} type="button"
                    onClick={deleteContact} />
            </div>
        </form >
    )
}
export default ContactPage