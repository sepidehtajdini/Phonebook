import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AscendingList from "./AscendingList";
import DescendingList from "./DescendingList";
import Button from "../../../Shared/Button/Button";
import "./contactsList.css";
import NewContactContext from "../../../NewContactContext";
export default function ContactsList() {
  const { theme, isLoggedIn, user } = useContext(NewContactContext);
  const [sortSelection, setSortSelection] = useState("hide");
  const [sortingType, setSortingType] = useState("نام خانوادگی");
  const [sortingTypeClass, setSortingTypeClass] = useState("ترتیب: نام خانوادگی");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();
  let arr = []
  const nonFavArr = [];
  const favArr = [];
  let AscDsc;

  for (let i = 0; i < localStorage.length; i++) {
    const parsedJson = JSON.parse(localStorage.getItem(localStorage.key(i)));
    if (isLoggedIn) {
      if (parsedJson.user === user.username) { arr.push(parsedJson) }
    }
    else {
      if (parsedJson.user === "") { arr.push(parsedJson) }
    }
  }
  for (const contact of arr) {
    if (contact.fav === false) { nonFavArr.push(contact) }
    if (contact.fav === true) { favArr.push(contact) }
    if (sortingType === "نام") {
      if (isAscending) {
        nonFavArr.sort((a, b) => (a.newName < b.newName) ? -1 : 1);
        favArr.sort((a, b) => (a.newName < b.newName) ? -1 : 1)
      }
      else {
        nonFavArr.sort((a, b) => (a.newName > b.newName) ? -1 : 1);
        favArr.sort((a, b) => (a.newName > b.newName) ? -1 : 1)
      }
    }
    else if (sortingType === "نام خانوادگی") {
      if (isAscending) {
        nonFavArr.sort((a, b) => (a.newLastName < b.newLastName) ? -1 : 1);
        favArr.sort((a, b) => (a.newLastName < b.newLastName) ? -1 : 1);
      }
      else {
        nonFavArr.sort((a, b) => (a.newLastName > b.newLastName) ? -1 : 1);
        favArr.sort((a, b) => (a.newLastName > b.newLastName) ? -1 : 1)
      }
    }
    arr = favArr.concat(nonFavArr);
  }
  { isAscending ? AscDsc = "ascending" : AscDsc = "descending" }
  return (
    <div className="contactsList-container">
      <div className="sorting-btns-container">
        <Button
          type="button"
          className="close-btn"
          onClick={() => navigate("/")} />
        <Button
          type="button"
          className="gray-btn"
          text={sortingTypeClass}
          onClick={() => setSortSelection("sort-selection")} />
        <div className={sortSelection}>
          <Button
            className="gray-btn sort-btn"
            text="نام"
            onClick={() => {
              setSortSelection("hide"); setSortingType("نام"); setSortingTypeClass("ترتیب: نام")
            }} />
          <Button
            className="gray-btn sort-btn"
            text="نام خانوادگی"
            onClick={() => {
              setSortSelection("hide"); setSortingType("نام خانوادگی");
              setSortingTypeClass("ترتیب: نام خانوادگی")
            }} />
        </div>
      </div>
      <table className={theme === "pinkTheme" ? "pink-table" : "olive-table"}>
        <thead>
          <tr>
            <th className={theme === "pinkTheme" ? "pink-th" : "olive-th"}>نام و نام خانوادگی
              <Button
                className={AscDsc}
                onClick={() => setIsAscending(!isAscending)} />
            </th>
            <th className={theme === "pinkTheme" ? "pink-th" : "olive-th"}>شماره</th>
            <th className={theme === "pinkTheme" ? "pink-th" : "olive-th"}>سن</th>
            <th className={theme === "pinkTheme" ? "pink-th" : "olive-th"}>ایمیل</th>
            <th className={theme === "pinkTheme" ? "pink-th" : "olive-th"}>جنسیت</th>
            <th className={theme === "pinkTheme" ? "pink-th" : "olive-th"}>نشانی</th>
            <th colSpan="3" className={theme === "pinkTheme" ? "pink-th" : "olive-th"}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {isAscending ? <AscendingList arr={arr} /> : <DescendingList arr={arr} />}
          <tr>
            {localStorage.getItem("user-pass") ?
              <td colSpan="7" className="fav-row">
                شما {arr.length} مخاطب دارید
              </td>
              :
              <td colSpan="7" className="fav-row">
                شما {localStorage.length} مخاطب دارید
              </td>}
          </tr>
        </tbody>
      </table>
    </div>
  )
}