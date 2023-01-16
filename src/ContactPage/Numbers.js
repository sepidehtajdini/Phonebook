import { useEffect, useState } from "react";
import Input from "../Shared/Input/Input";
export default function Numbers({ Obj, isDisabled }) {
    const [moreNumsList, setMoreNumsList] = useState([]);
    useEffect(() => {
        if (Obj.numbers !== {}) {
            setMoreNumsList(Object.values(Obj.numbers));
        }
    }, [])
    function handleChangeMoreNums(e, index) {
        const regExp = /^[0-9]*$/.test(e.target.value);
        if (regExp) {
            const list = [...moreNumsList];
            list[index] = e.target.value;
            setMoreNumsList(list);
            if (list[index].length === 11 || list[index].length === 0) {
                Object.assign(Obj.numbers, list);
                sessionStorage.setItem("numbers", JSON.stringify(Obj));
            }
        }
        else{
            alert("شماره باید به لاتین وارد شود");
            return
        }
    }
    return (
        moreNumsList ?
            moreNumsList.map((item, index) =>
                <Input
                    key={item}
                    value={item}
                    labelText="شماره تلفن:"
                    name="moreNumbers"
                    type="tel"
                    disabled={isDisabled}
                    onChange={(e) => handleChangeMoreNums(e, index)} />)
            : null
    )
}