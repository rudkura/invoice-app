export function InputCheck(props) {
    const INPUTS = ["checkbox", "radio"];

    const type = props.type;
    const checked = props.checked || "";

    if (!INPUTS.includes(type)) {
        return null;
    }

    return (
        <div className="form-group form-check">
            <label className="form-check-label">
                <input 
                    type={type}
                    className="form-check-input"
                    name={props.name}
                    value={props.value}
                    checked={checked}    
                    onChange={props.handleChange}
                />{" "}
                {props.label}
            </label>
        </div>
    );
}