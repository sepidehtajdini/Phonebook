import { useContext } from "react";
import Button from "../../../Shared/Button/Button";
import NewContactContext from "../../../NewContactContext";
import { useNavigate } from "react-router-dom";
function Contact({ newName, newLastName, newEmail, newAge, newNumber, genderType, newAddress, fav,
    numbersObj, user }) {
    const { setNewName, setNewLastName, setNewAge, setNewNumber, setNewEmail, setGenderType, setNewAddress,
        setNumbersObj } = useContext(NewContactContext);
    const navigate = useNavigate();
    let Obj = {
        user: user,
        fav: fav,
        newName: newName,
        newLastName: newLastName,
        newNumber: newNumber,
        numbers: {},
        newAge: newAge,
        newEmail: newEmail,
        genderType: genderType,
        newAddress: newAddress
    }
    if (numbersObj !== {}) {
        Object.assign(Obj.numbers, Object.values(numbersObj));
    }
    function removeContact() {
        localStorage.removeItem(newNumber, JSON.stringify(Obj));
        setNewName("");
        setNewLastName("");
        setNewNumber("");
        setNumbersObj("");
        setNewAge("");
        setNewEmail("");
        setGenderType("");
        setNewAddress("");
        window.location.reload()
    }
    function editContact() {
        sessionStorage.setItem("edit-contact", JSON.stringify(Obj));
        navigate("/ContactPage");
    }
    function handleFav() {
        for (let item of Object.keys(Obj)) {
            if (typeof Obj[item] == "boolean") {
                if (Obj[item] === false) {
                    Obj[item] = true;
                    localStorage.setItem(newNumber, JSON.stringify(Obj));
                }
                else {
                    Obj[item] = false;
                    localStorage.setItem(newNumber, JSON.stringify(Obj));
                }
            }
        }
        window.location.reload()
    }
    return (<tr>
        <td className={Obj.fav === true ? "fav-row" : null}>{newName} {newLastName}</td>
        <td className={Obj.fav === true ? "fav-row" : null}>
            {newNumber}
            {Object.values(JSON.parse(localStorage.getItem(newNumber)).numbers).map((item) =>
                <div key={item}>{Object.values(item)}</div>
            )}
        </td>
        <td className={Obj.fav === true ? "fav-row" : null}>{newAge}</td>
        <td className={Obj.fav === true ? "fav-row" : null}>{newEmail}</td>
        <td className={Obj.fav === true ? "fav-row" : null}>{genderType}</td>
        <td className={Obj.fav === true ? "fav-row" : null}>{newAddress}</td>
        <td colSpan="3" className={Obj.fav === true ? "fav-row" : null} >
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
                className={Obj.fav === true ? "fav-btn yellow" : "fav-btn"}
                onClick={handleFav} />
        </td>
    </tr>)
}
export default Contact
