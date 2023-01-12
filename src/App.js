import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import NewContactContext from "./NewContactContext";
import Home from "./Home/Home";
import ContactPage from "./ContactPage/ContactPage";
import SideBar from "./Home/Body/SideBar/SideBar";
import AddNewContact from "./Home/Body/AddContactForm/AddContactForm";
import ContactsList from "./Home/Body/ContactsList/ContactsList";
import SearchResult from "./Home/Body/SearchResult/SearchResult";
import SignUp from "./Home/Body/SignUp/SignUp";
import LoginForm from "./Home/Body/SignUp/Login/LoginForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
    children: ([
      {
        path: "AddNewContactForm",
        element: (<AddNewContact />)
      },
      {
        path: "SideBar",
        element: (<SideBar />)
      },
      {
        path: "SearchResult",
        element: (<SearchResult />)
      },
      {
        path: "ContactsList",
        element: (<ContactsList />)
      },
      {
        path: "SignUp",
        element: (<SignUp />)
      },
      {
        path: "Login",
        element: (<LoginForm />)
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
  const [editFav, setEditFav] = useState(false);
  const [theme, setTheme] = useState("pinkTheme");
  const [numbersObj, setNumbersObj] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("last-login")) {
      setIsLoggedIn(true);
      setUser(JSON.parse(sessionStorage.getItem("last-login")));
    }
  }, [])
  return (
    <NewContactContext.Provider value={{
      newName, setNewName, newLastName, setNewLastName, newNumber, setNewNumber, newAge, setNewAge,
      newEmail, setNewEmail, newAddress, setNewAddress, genderType, setGenderType,
      contactsListClass, setContactsListClass,
      editing, setEditing,
      editName, editLastName, editNumber, editAge, editEmail, editAddress,
      setEditName, setEditLastName, setEditNumber, setEditAge, setEditEmail, setEditAddress,
      editFav, setEditFav,
      theme, setTheme,
      numbersObj, setNumbersObj,
      isLoggedIn, setIsLoggedIn,
      user, setUser
    }}>
      <div>
        <RouterProvider router={router} />
      </div>
    </NewContactContext.Provider>
  )
}
export default App
