import "./button.css";
function Button({ type, text, className, onClick, disabled, id ,tooltipContent}) {

    return (
        <button
            type={type}
            id={id}
            className={className}
            onClick={onClick}
            disabled={disabled}
            data-tooltip-content={tooltipContent}>
            {text}
        </button>
    )
}
export default Button