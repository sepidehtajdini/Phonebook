import Button from "../../../Shared/Button/Button";
import { useContext, useState } from "react";
import NewContactContext from "../../../NewContactContext";
export default function MoreNums({ Obj }) {
  const { setNumbersObj, numbersObj } = useContext(NewContactContext);
  const [moreNumsList, setMoreNumsList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  function handleInputChange(e, index) {
    const regExp = /^[0-9]*$/.test(e.target.value);
    if (regExp) {
      if (e.target.value.length < 11) {
        alert("شماره را به همراه پیش شماره وارد کنید")
        return
      }
      else {
        setIsEnabled(true);
        const list = [...moreNumsList];
        list[index] = e.target.value;
        setMoreNumsList(list);
      }
    }
    else { setIsEnabled(false) }
  }
  // function handleRemoveNumClick(index) {
  //   const list = [...moreNumsList];
  //   list.splice(index, 1);
  //   setMoreNumsList(list);
  //   Object.assign((numbers), null)
  //    console.log(numbers)
  // }
  function handleAddNumClick() {
    setMoreNumsList([...moreNumsList, ""]);
  }
  function handleNumSubmit() {
    if (Obj.numbers !== {}) {
      const array = [];
      const lastValue = Object.values(Obj.numbers);
      for (let i = 0; i < lastValue.length; i++) {
        array.push(lastValue[i])
      }
      const newValues = array.concat(moreNumsList)
      setNumbersObj(newValues);
      Object.assign(Obj.numbers, newValues);
      localStorage.setItem(Obj.newNumber, JSON.stringify(Obj));
    }
    else {
      Object.assign(Obj.numbers, moreNumsList);
      setNumbersObj(moreNumsList);
      localStorage.setItem(Obj.newNumber, JSON.stringify(Obj));
    }
  }
  return (
    <div>
      <Button
        type="button"
        className="black-btn center"
        onClick={handleAddNumClick}
        text="افزودن شماره" />
      {moreNumsList.length >= 1 ? moreNumsList.map((x, index) => {
        return (
          <div key={index} style={{ marginTop: 5 + "px" }}>
            <input
              style={{ marginRight: 12 + "%", width: 60 + "%" }}
              type="tel"
              name="tel"
              placeholder="شماره را وارد کرده و تایید کنید"
              value={x.tel}
              key={x.tel}
              onChange={(e) => handleInputChange(e, index)} />
            {/* <Button
              type="button"
              className="delete-btn"
              onClick={() => handleRemoveNumClick(index)}
              text="حذف"
            /> */}
            <Button
              type="button"
              className="green-btn"
              onClick={handleNumSubmit}
              text="تایید" />
          </div>)
      }) : null}
    </div>
  )
}
