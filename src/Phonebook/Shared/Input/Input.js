import "./input.css";
function Input({ labelText, name, onChange, type, placeholder, inputClassName, disabled , checked, value}) {
    return (
        <div className="inputClass">
            <label htmlFor={name}>{labelText}</label>
            <input name={name} type={type} className={inputClassName} onChange={onChange}
            checked={checked} placeholder={placeholder} value={value} disabled={disabled} />
        </div>
    )
}
export default Input