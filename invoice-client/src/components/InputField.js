export function InputField(props) {
    const INPUTS = ["text", "number", "date", "email", "tel"];
    const NUMERIC = ["number", "date"];
    const TEXT = ["text", "textarea"];

    const type = props.type;
    const isTextarea = type === "textarea";
    const required = props.required || false;

    if (!isTextarea && !INPUTS.includes(type)) {
        return null;
    }

    const minProp = props.min || null;
    const min = NUMERIC.includes(type) ? minProp : null;
    const minLength = TEXT.includes(type) ? minProp : null;

    return (
        <div className="form-group">
            <label>{props.label}:</label>

            {isTextarea ? (
                <textarea 
                    required={required}
                    className="form-control"
                    placeholder={props.prompt}
                    rows={props.rows}
                    minLength={minLength}
                    name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                />
            ) : (
                <input
                    required={required}
                    type={type}
                    className="form-control"
                    placeholder={props.prompt}
                    minLength={minLength}
                    min={min}
                    name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                />
            )}
        </div>
    )

}