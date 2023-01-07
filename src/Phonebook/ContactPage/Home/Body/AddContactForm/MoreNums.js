import Button from "../../../Shared/Button/Button";
import { useContext, useState } from "react";
import NewContactContext from "../../../NewContactContext";
export default function MoreNums() {
  const { setNumbersObj } = useContext(NewContactContext);
  const [moreNumsList, setMoreNumsList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  function handleInputChange(e, index) {
    const regExp = /^[0-9]{11}$/.test(e.target.value);
    if (regExp) {
      setIsEnabled(true);
      const list = [...moreNumsList];
      list[index] = e.target.value;
      setMoreNumsList(list);
    }
    else { setIsEnabled(false);}
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
  function handleNumSubmit(e) {
    setNumbersObj(moreNumsList);
  }
  return (
    <div>
      <Button
        type="button"
        className="black-btn center"
        onClick={handleAddNumClick}
        text="افزون شماره تلفن جدید"
      />
      {moreNumsList.length >= 1 ? moreNumsList.map((x, index) => {
        return (
          <div key={index} style={{ marginTop: 5 + "px" }}>
            <input
              style={{ marginRight: 31 + "%", width: 50 + "%" }}
              type="tel"
              name="tel"
              placeholder="شماره را وارد کرده و سپس تایید کنید"
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
