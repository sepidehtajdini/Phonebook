import Contact from "./Contact";
export default function AscendingList({ arr }) {
    return (
        <>
            {(arr !== []) ?
                arr.map((contact, i) =>
                    <Contact
                        id={i + 1}
                        user={contact.user}
                        fav={contact.fav}
                        newName={contact.newName}
                        newLastName={contact.newLastName}
                        numbers={contact.numbers}
                        newAge={contact.newAge}
                        newEmail={contact.newEmail}
                        genderType={contact.genderType}
                        newAddress={contact.newAddress}
                        key={i} />)
                : null}
        </>
    )
}