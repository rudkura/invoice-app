export function InputSelect(props) {

    const multiple = props.multiple;
    const required = props.required || false;

    const emptySelected = multiple ? [] : "";

    return (
        <div className="form-group">
            <label>{props.label}:</label>
            <select
                required={required}
                className="browser-default form-select"
                multiple={multiple}
                name={props.name}
                onChange={props.handleChange}
                value={props.value}
            >
                {required ? (
                    <option disabled value={emptySelected}>
                        {props.prompt}
                    </option>
                ) : (
                    <option key="empty" value={emptySelected}>
                        {props.prompt}
                    </option>
                )}
                {props.items.map((item, index) => (
                    <option key={item._id} value={item._id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}