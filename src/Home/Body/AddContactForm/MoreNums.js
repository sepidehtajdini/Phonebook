import Button from "../../../Shared/Button/Button";
import { useContext, useState } from "react";
import NewContactContext from "../../../NewContactContext";
import { Tooltip } from "react-tooltip";
export default function MoreNums({ Obj }) {
  const { setNumbersObj } = useContext(NewContactContext);
  const [moreNumsList, setMoreNumsList] = useState([]);
  function handleInputChange(e, index) {
    const regExp = /^[0-9]*$/.test(e.target.value);
    if (regExp) {
      if (e.target.value.length === 11) {
        const list = [...moreNumsList];
        list[index] = e.target.value;
        setMoreNumsList(list);
      }
    }
  }
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
      sessionStorage.setItem("numbers", JSON.stringify(Obj));
    }
    else {
      setNumbersObj(moreNumsList);
      Object.assign(Obj.numbers, moreNumsList);
      sessionStorage.setItem("numbers", JSON.stringify(Obj));
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
          <div key={index} className="inputClass">
            <label>شماره تلفن:</label>
            <input
              style={{ marginRight: 12 + "%", width: 60 + "%" }}
              type="tel"
              name="tel"
              placeholder="شماره را وارد کرده و تایید کنید"
              value={x.tel}
              key={x.tel}
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
