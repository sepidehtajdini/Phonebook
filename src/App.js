import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import NewContactContext from "./Phonebook/NewContactContext";
import Home from "./Phonebook/Home/Home";
import ContactPage from "./Phonebook/ContactPage/ContactPage";
import SideBar from "./Phonebook/Home/Body/SideBar/SideBar";
import AddNewContact from "./Phonebook/Home/Body/AddContactForm/AddContactForm";
import ContactsList from "./Phonebook/Home/Body/ContactsList/ContactsList";
import SearchResult from "./Phonebook/Home/Body/SearchResult/SearchResult";
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
    children: ([
      {
        path: "Home/AddNewContactForm",
        element: (<AddNewContact />)
      },
      {
        path: "Home/SideBar",
        element: (<SideBar />)
      },
      {
        path: "Home/SearchResult",
        element: (<SearchResult />)
      },
      {
        path: "Home/ContactsList",
        element: (<ContactsList />)
      }
    ])
  },
  {
    path: "/ContactPage",
    element: (<ContactPage />)
  }
])
function App() {
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [genderType, setGenderType] = useState("انتخاب جنسیت");
  const [contactsListClass, setContactsListClass] = useState("hide");
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const [favCounter, setFavCounter] = useState(0);
  const [favClass, setFavClass] = useState("");
  const [editFavCounter, setEditFavCounter] = useState(0);
  const [isFaved, setIsFaved] = useState(false);
  return (
    <NewContactContext.Provider value={{
      newName, setNewName, newLastName, setNewLastName, newNumber, setNewNumber, newAge, setNewAge,
      newEmail, setNewEmail, newAddress, setNewAddress, genderType, setGenderType,
      contactsListClass, setContactsListClass,
      editing, setEditing,
      editName, editLastName, editNumber, editAge, editEmail, editAddress,
      setEditName, setEditLastName, setEditNumber, setEditAge, setEditEmail, setEditAddress,
      favCounter, setFavCounter, favClass, setFavClass, editFavCounter,
      isFaved, setIsFaved
    }}>
      <div>
        <RouterProvider router={router} />
      </div>
    </NewContactContext.Provider >
  )
}
export default App