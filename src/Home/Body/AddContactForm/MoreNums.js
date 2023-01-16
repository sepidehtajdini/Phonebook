import { useState } from "react";
import { Tooltip } from "react-tooltip";
import Button from "../../../Shared/Button/Button";
export default function MoreNums({ Obj }) {
  const [moreNumsList, setMoreNumsList] = useState([]);
  function handleAddNumClick() { setMoreNumsList([...moreNumsList, ""]) }
  function handleInputChange(e, index) {
    const regExp = /^[0-9]*$/.test(e.target.value);
    if (regExp) {
      const list = [...moreNumsList];
      list[index] = e.target.value;
      setMoreNumsList(list);
    }
  }
  function handleNumSubmit() {
    for (let i = 0; i < moreNumsList.length; i++) {
      if (moreNumsList[i].length === 11) {
        if (Obj.numbers !== {}) {
          const array = [];
          const lastValue = Object.values(Obj.numbers);
          for (let i = 0; i < lastValue.length; i++) { array.push(lastValue[i]) }
          const newValues = array.concat(moreNumsList);
          Object.assign(Obj.numbers, newValues);
          sessionStorage.setItem("numbers", JSON.stringify(Obj));
        }
        else {
          Object.assign(Obj.numbers, moreNumsList);
          sessionStorage.setItem("numbers", JSON.stringify(Obj));
        }
      }
      else {
        alert("شماره باید ۱۱ رقمی باشد");
        return
      }
    }
  }
  return (
    <div>
      <Button
        type="button"
        className="black-btn center"
        onClick={handleAddNumClick}
        text="افزودن شماره" />
      {moreNumsList.length >= 1 ? moreNumsList.map((item, index) => {
        return (
          <div key={index} className="inputClass">
            <label htmlFor="tel">شماره تلفن:</label>
            <input
              autoFocus
              style={{ marginRight: 12 + "%", width: 60 + "%" }}
              type="tel"
              name="tel"
              placeholder="شماره را وارد کرده و تایید کنید"
              value={item}
              key={item}
              onChange={(e) => handleInputChange(e, index)} />
            <Button
              id="validate"
              type="button"
              className="check-btn"
              onClick={handleNumSubmit}
              tooltipContent="تایید" />
            <Tooltip anchorId="validate" className="tooltip green-tooltip" />
          </div>
        )
      }) : null}
    </div >
  )
}
