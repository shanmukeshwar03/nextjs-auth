const Input = (props) => {
  return (
    <div className="input-container">
      <div className="input-header">
        <label>{props.label}</label>
        <label>{props.error}</label>
      </div>
      <div className="text-input">
        {props.icon && (
          <img height={23} width={23} src={`/icons/${props.label}.svg`} />
        )}
        <input
          name={props.label}
          onChange={props.onChange}
          placeholder={props.placeholder}
          value={props.value}
          type={props.isPassword === "eye-close" ? "password" : "text"}
          required
        />
        {props.isPassword && props.icon && (
          <img
            onClick={props.togglePassword}
            height={23}
            width={23}
            src={`/icons/${props.isPassword}.svg`}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
