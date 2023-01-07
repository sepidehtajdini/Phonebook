import { useContext, useState, useRef } from "react";
import Button from "../../../Shared/Button/Button";
import NewContactContext from "../../../NewContactContext";
import { useNavigate } from "react-router-dom";
function Contact({ newName, newLastName, newEmail, newAge, newNumber, genderType, newAddress, fav }) {
    const { setNewName, setNewLastName, setNewAge, setNewNumber, setNewEmail, setGenderType, setNewAddress,
        setEditing, setEditName, setEditLastName, setEditNumber, setEditAge, setEditEmail,
        setEditAddress, favClass, setFavClass, setEditFav,
    } = useContext(NewContactContext);
    const [favBtnClass, setFavBtnClass] = useState("fav-btn");
    const navigate = useNavigate();
    let arr = [];
    const favContacts = [];
    for (let i = 0; i < localStorage.length; i++) {
        arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        if (arr[i].fav === true) { favContacts.push(arr[i]) };
    }
    let Obj = {
        fav: fav,
        newName: newName,
        newLastName: newLastName,
        newNumber: newNumber,
        newAge: newAge,
        newEmail: newEmail,
        genderType: genderType,
        newAddress: newAddress
    }
    function removeContact() {
        // if (ObjProps[0] === "true") {
        //     localStorage.removeItem(newNumber, JSON.stringify(trueFavObj));
        // }
        // else {
        //     localStorage.removeItem(newNumber, JSON.stringify(falseFavObj));
        // }
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
        // setEditFav(isFaved);
        setEditName(newName);
        setEditLastName(newLastName);
        setEditNumber(newNumber);
        setEditAge(newAge);
        setEditEmail(newEmail);
        setGenderType(genderType);
        setEditAddress(newAddress);
        navigate("/ContactPage");
    }
    function handleFav() {
        for (let item of Object.keys(Obj)) {
            if (typeof Obj[item] == "boolean") {
                if (Obj[item] === false) {
                    Obj[item] = true
                    localStorage.setItem(newNumber, JSON.stringify(Obj));
                    setFavClass("fav-row");
                    setFavBtnClass("fav-btn-yellow");
                }
                else {
                    Obj[item] = false
                    localStorage.setItem(newNumber, JSON.stringify(Obj));
                    setFavClass("");
                    setFavBtnClass("fav-btn");
                }
            }
        }
    }
    return (
        <tr className={favClass}>
            <td>{newName} {newLastName}</td>
            <td>{newNumber}</td>
            <td>{newAge}</td>
            <td>{newEmail}</td>
            <td>{genderType}</td>
            <td>{newAddress}</td>
            <td colSpan="3" >
                <Button
                    type="button"
                    className="edit-btn"
                    onClick={editContact} />
                <Button
                    type="button"
                    className="trash-btn"
                    onClick={removeContact} />
                <Button
                    type="button"
                    className={favBtnClass}
                    onClick={handleFav} />
            </td>
        </tr>)
}
export default Contact
