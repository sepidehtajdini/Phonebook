import "./button.css";
function Button({ type, text, className, onClick, disabled }) {

    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}
export default Button