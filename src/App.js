import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import NewContactContext from "./NewContactContext";
import Home from "./Home/Home";
import ContactPage from "./ContactPage/ContactPage";
import SideBar from "./Home/Body/SideBar/SideBar";
import AddContactForm from "./Home/Body/AddContactForm/AddContactForm";
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
        path: "AddContactForm",
        element: (<AddContactForm />)
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
    element: (<ContactPage />),
    children: ([
      {
        path: '/ContactPage/:query',
        element: (<ContactPage />)
      }
    ])
  }
])
export default function App() {
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [genderType, setGenderType] = useState("انتخاب جنسیت");
  const [contactsListClass, setContactsListClass] = useState("hide");
  const [theme, setTheme] = useState("pinkTheme");
  const [numbers, setNumbers] = useState([]);
  function addNumber(newNumber) {
    setNumbers([...numbers, newNumber]);
  }
  return (
    <NewContactContext.Provider value={{
      newName, setNewName, newLastName, setNewLastName,
      newAge, setNewAge,
      newEmail, setNewEmail, newAddress, setNewAddress, genderType, setGenderType,
      contactsListClass, setContactsListClass,
      theme, setTheme,
      addNumber, numbers, setNumbers
    }}>
      <div className={theme === "pinkTheme" ? "container pink-container" : "container olive-container"}>
        <RouterProvider router={router} />
      </div>
    </NewContactContext.Provider>
  )
}