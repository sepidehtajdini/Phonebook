import Contact from "./Contact";
import NewContactContext from "../../../NewContactContext";
import { useContext } from "react";
function AscendingList({ arr }) {
    const { favCounter } = useContext(NewContactContext);
    return (
        <>
            {(arr !== []) ?
                arr.map((contact) => <Contact
                    favCounter={favCounter}
                    newName={contact.newName}
                    newLastName={contact.newLastName}
                    newNumber={contact.newNumber}
                    newAge={contact.newAge}
                    newEmail={contact.newEmail}
                    genderType={contact.genderType}
                    newAddress={contact.newAddress}
                    key={contact.newNumber}
                />) : null}
        </>
    )
}
export default AscendingList