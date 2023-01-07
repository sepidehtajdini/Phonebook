import { useState } from "react";
import AscendingList from "./AscendingList";
import DescendingList from "./DescendingList";
import Button from "../../../Shared/Button/Button";
import "./contactsList.css";
import { useNavigate } from "react-router-dom";
export default function ContactsList() {
  const [sortSelection, setSortSelection] = useState("hide");
  const [sortingType, setSortingType] = useState("نام خانوادگی");
  const [sortingTypeClass, setSortingTypeClass] = useState("مرتب سازی: نام خانوادگی");
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();
  let arr = []
  const nonFavArr = [];
  const favArr = [];
  let AscDsc;
  for (let i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    arr.sort((a, b) => a.fav < b.fav ? -1 : 1);
    if (arr[i].fav === false) { nonFavArr.push(arr[i]) }
    if (arr[i].fav === true) { favArr.push(arr[i]) }
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
      <div style={{ minWidth: 20 + "vw" }}>
        <Button
          type="button"
          className="close-btn"
          onClick={() => navigate("/")} />
        <div>
          <Button
            type="button"
            className="gray-btn"
            text={sortingTypeClass}
            onClick={() => setSortSelection("sort-selection")} />
        </div>
        <div className={sortSelection}>
          <Button
            className="gray-btn sort-btn"
            text="نام"
            onClick={() => {
              setSortSelection("hide"); setSortingType("نام"); setSortingTypeClass("مرتب سازی: نام")
            }} />
          <Button
            className="gray-btn sort-btn"
            text="نام خانوادگی"
            onClick={() => {
              setSortSelection("hide"); setSortingType("نام خانوادگی");
              setSortingTypeClass("مرتب سازی: نام خانوادگی")
            }} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>نام و نام خانوادگی
              <Button
                className={AscDsc}
                onClick={() => setIsAscending(!isAscending)} />
            </th>
            <th>شماره</th>
            <th>سن</th>
            <th>ایمیل</th>
            <th>جنسیت</th>
            <th>نشانی</th>
            <th colSpan="3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {isAscending ? <AscendingList arr={arr} /> : <DescendingList arr={arr} />}
        </tbody>
      </table>
    </div>
  )
}