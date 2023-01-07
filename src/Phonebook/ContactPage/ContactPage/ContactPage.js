import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewContactContext from "../NewContactContext";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import "./contactPage.css";
function ContactPage() {
    const { newName, setNewName, newLastName, setNewLastName, newNumber, setNewNumber, newAge,
        setNewAge, newEmail, setNewEmail, newAddress, setNewAddress, genderType,
        setGenderType,
        editing, setEditing, editName, editLastName, editNumber, editAge,
        editEmail, editAddress, fav, editFav,
        setEditName, setEditLastName, setEditNumber,
        setEditAge, setEditEmail, setEditGenderType, setEditAddress
    } = useContext(NewContactContext);
    const [isDisabled, setIsDisabled] = useState(true);
    const [mailTo, setMailTo] = useState("");
    const [emptyMail, setEmptyMail] = useState(true);
    const [tel, setTel] = useState("");
    const navigate = useNavigate();
    let Obj;
    {
        editing ? Obj = {
            fav: `${editFav}`,
            newName: `${editName}`,
            newLastName: `${editLastName}`,
            newNumber: `${editNumber}`,
            newAge: `${editAge}`,
            newEmail: `${editEmail}`,
            genderType: `${genderType}`,
            newAddress: `${editAddress}`
        }
            : Obj = {
                fav: `${fav}`,
                newName: `${newName}`,
                newLastName: `${newLastName}`,
                newNumber: `${newNumber}`,
                newAge: `${newAge}`,
                newEmail: `${newEmail}`,
                genderType: `${genderType}`,
                newAddress: `${newAddress}`
            }
    }
    function editContact() {
        editing ? localStorage.removeItem(editNumber, JSON.stringify(Obj))
            : localStorage.removeItem(newNumber, JSON.stringify(Obj));
        setIsDisabled(false);
    }
    function saveContactValues() {
        if (editing) {
            if (editAge === "") { setEditAge("") }
            localStorage.setItem(editNumber, JSON.stringify(Obj));
        }
        else {
            if (newAge === "") { setNewAge("") }
            localStorage.setItem(newNumber, JSON.stringify(Obj));
        }
    }
    function deleteContact() {
        if (editing) {
            localStorage.removeItem(editNumber, JSON.stringify(Obj));
            alert(`مخاطب ${editLastName} ${editName} با موفقیت حذف شد`);
        }
        else {
            localStorage.removeItem(newNumber, JSON.stringify(Obj));
            alert(`مخاطب ${newLastName} ${newName} با موفقیت حذف شد`);
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
            setTel(e.target.value);
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
            setMailTo(`${e.target.value}`);
            editing ? setEditEmail(e.target.value) : setNewEmail(e.target.value)
        }
    }
    function handleChangeAddressValue(e) {
        editing ? setEditAddress(e.target.value) : setNewAddress(e.target.value)
    }
    if (mailTo !== "") {
        setEmptyMail(false)
    }
    return (
        <form className="contact_container">
            <h2>مشخصات مخاطب</h2>
            <Button
                text="بازگشت"
                type="button"
                className="black-btn"
                onClick={() => { setEditing(false); navigate("/") }}
            />
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
            <div className="inputClass" >
                جنسیت:
                <Input
                    labelText="خانم"
                    name="woman"
                    type="radio"
                    disabled={isDisabled}
                    checked={genderType === "خانم" ? true : false}
                    onChange={() => setGenderType("خانم")}
                />
                <Input
                    labelText="آقا"
                    name="man"
                    type="radio"
                    disabled={isDisabled}
                    checked={genderType === "آقا" ? true : false}
                    onChange={() => setGenderType("آقا")}
                />
            </div>
            <div className="flex-items">
                <label htmlFor="address">نشانی: </label>
                <textarea
                    name="address"
                    disabled={isDisabled}
                    value={editing ? editAddress : newAddress}
                    onChange={handleChangeAddressValue}
                />
            </div>
            <div className="flex-items">
                <Button
                    type="button"
                    text={<a href={`mailto:${mailTo}`} disabled={emptyMail}>mailto</a>}
                />
                <Button
                    type="button"
                    text={<a href={`tel:${tel}`}>تماس با کاربر</a>} />
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