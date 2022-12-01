export const InputHooks = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={props.isValid ? null : "error-field"}
        required={props.required}
        autoComplete={props.autoComplete}
      />
      {props.isValid ? null : <p className="error-txt">{props.errorMessage}</p>}
    </div>
  );
};

export const TextareaHooks = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        type={props.type}
        rows={props.rows}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={props.isValid ? null : "error-field"}
        required={props.required}
        autoComplete={props.autoComplete}
      />
      {props.isValid ? null : <p className="error-txt">{props.errorMessage}</p>}
    </div>
  );
};
