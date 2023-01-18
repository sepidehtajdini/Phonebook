import { useContext } from "react";
import Button from "../../../Shared/Button/Button";
import NewContactContext from "../../../NewContactContext";
import { useNavigate } from "react-router-dom";
function Contact({ id, newName, newLastName, numbers, newEmail, newAge, genderType, newAddress, fav, user }) {
    const { setNewName, setNewLastName, setNewAge, setNumbers, setNewEmail, setGenderType, setNewAddress
    } = useContext(NewContactContext);
    const navigate = useNavigate();
    let Obj = {
        user: user,
        fav: fav,
        newName: newName,
        newLastName: newLastName,
        numbers: numbers,
        newAge: newAge,
        newEmail: newEmail,
        genderType: genderType,
        newAddress: newAddress
    }
    function removeContact() {
        localStorage.removeItem(Obj.numbers[0], JSON.stringify(Obj));
        setNewName("");
        setNewLastName("");
        setNumbers([]);
        setNewAge("");
        setNewEmail("");
        setGenderType("");
        setNewAddress("");
    }
    function editContact() {
        sessionStorage.setItem("edit-contact", JSON.stringify(Obj));
        sessionStorage.setItem("first-number", Obj.numbers[0]);
        navigate(`/ContactPage/${id}`);
    }
    function handleFav() {
        for (let item of Object.keys(Obj)) {
            if (typeof Obj[item] == "boolean") {
                if (Obj[item] === false) {
                    Obj[item] = true;
                    localStorage.setItem(numbers[0], JSON.stringify(Obj));
                }
                else {
                    Obj[item] = false;
                    localStorage.setItem(numbers[0], JSON.stringify(Obj));
                }
            }
        }
        navigate("/ContactsList")
    }
    return (<tr>
        <td className={Obj.fav === true ? "fav-row" : null}>{id}</td>
        <td className={Obj.fav === true ? "fav-row" : null}>{newName} {newLastName}</td>
        <td className={Obj.fav === true ? "fav-row" : null}>
            {numbers.map((number) => <div key={number}>{number}</div>)}
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