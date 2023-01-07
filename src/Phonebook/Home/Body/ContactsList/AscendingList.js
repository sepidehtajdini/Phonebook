import { useContext } from "react";
import NewContactContext from "../../../NewContactContext";
import Contact from "./Contact";
function AscendingList({ arr }) {
    return (
        <>
            {(arr !== []) ?
                arr.map((contact) => <Contact
                    fav={contact.fav}
                    newName={contact.newName}
                    newLastName={contact.newLastName}
                    newNumber={contact.newNumber}
                    numbersObj={contact.numbers}
                    newAge={contact.newAge}
                    newEmail={contact.newEmail}
                    genderType={contact.genderType}
                    newAddress={contact.newAddress}
                    key={contact.newNumber}
                />)
                : null}
        </>
    )
}
export default AscendingList
