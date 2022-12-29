import { useContext, useState, useRef } from "react";
import Button from "../../../Shared/Button/Button";
import NewContactContext from "../../../NewContactContext";
import { useNavigate } from "react-router-dom";
function Contact({ newName, newLastName, newEmail, newAge, newNumber, genderType, newAddress, favCounter }) {
    const { setNewName, setNewLastName, setNewAge, setNewNumber, setNewEmail, setGenderType, setNewAddress,
        setEditing, setEditName, setEditLastName, setEditNumber, setEditAge, setEditEmail,
        setEditAddress, setFavCounter, favClass, setFavClass, setEditFavCounter, isFaved,
        setIsFaved } = useContext(NewContactContext);
    const [favBtnClass, setFavBtnClass] = useState("fav-btn");
    const navigate = useNavigate();
   
    const Obj = {
        favCounter: `${favCounter}`,
        newName: `${newName}`,
        newLastName: `${newLastName}`,
        newNumber: `${newNumber}`,
        newAge: `${newAge}`,
        newEmail: `${newEmail}`,
        genderType: `${genderType}`,
        newAddress: `${newAddress}`
    }
    // for (let i = 0; i < localStorage.length; i++) {
    //     let myContact = JSON.parse(localStorage.key(i));
    //     if (myContact.favCounter == 1) {
    //         setFavBtnClass("fav-btn-yellow")
    //     }
    //     else {
    //         setFavBtnClass("fav-btn")
    //     }
    // }

    function removeContact() {
        localStorage.removeItem(JSON.stringify(Obj), newNumber);
        setFavCounter(0);
        setNewName("");
        setNewLastName("");
        setNewNumber("");
        setNewAge("");
        setNewEmail("");
        setGenderType("");
        setNewAddress("");
        window.location.reload();
    }
    function editContact() {
        setEditing(true);
        // setEditFavCounter(favCounter);
        setEditName(newName);
        setEditLastName(newLastName);
        setEditNumber(newNumber);
        setEditAge(newAge);
        setEditEmail(newEmail);
        setGenderType(genderType);
        setEditAddress(newAddress);
        navigate("/ContactPage");
    }
    // { isFaved ? setFavClass("fav-td") : setFavClass("") }

    function handleFav() {
        let newObj;
        localStorage.removeItem(JSON.stringify(Obj), newNumber);
        if (isFaved) {
            setFavClass("");
            setFavBtnClass("fav-btn");
            newObj = {
                favCounter: `${favCounter - 1}`,
                newName: `${newName}`,
                newLastName: `${newLastName}`,
                newNumber: `${newNumber}`,
                newAge: `${newAge}`,
                newEmail: `${newEmail}`,
                genderType: `${genderType}`,
                newAddress: `${newAddress}`
            }
            setFavCounter(favCounter - 1);
            localStorage.setItem(JSON.stringify(newObj), newNumber);
        }
        else {
            setFavClass("fav-td");
            setFavBtnClass("fav-btn-yellow");
            newObj = {
                favCounter: `${favCounter + 1}`,
                newName: `${newName}`,
                newLastName: `${newLastName}`,
                newNumber: `${newNumber}`,
                newAge: `${newAge}`,
                newEmail: `${newEmail}`,
                genderType: `${genderType}`,
                newAddress: `${newAddress}`
            }
            setFavCounter(favCounter + 1);
            localStorage.setItem(JSON.stringify(newObj), newNumber);
        }
        setIsFaved(!isFaved);
    }
    return (
        <tr className={favClass}>
            <td >{newName} {newLastName}</td>
            <td >{newNumber}</td>
            <td >{newAge}</td>
            <td >{newEmail}</td>
            <td >{genderType}</td>
            <td >{newAddress}</td>
            <td colSpan="3" >
                <Button
                    className="green-btn"
                    onClick={editContact}
                    text="ویرایش" />
                <Button
                    type="button"
                    className="delete-btn"
                    onClick={removeContact}
                    text="حذف" />
                <Button
                    type="button"
                    className={favBtnClass}
                    onClick={handleFav} />
            </td>
        </tr>)
}
export default Contact
