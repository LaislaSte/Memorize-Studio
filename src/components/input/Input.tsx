import './Input.css';

interface IInput {
  type: string;
  className: string;
  text: string;
  icon: React.ReactElement;
  onchange: () => {};
  value: string;
  message: string;
  showMessage: boolean;
}
const Input: React.FC<IInput> = ({
  type,
  className,
  text,
  icon,
  onchange,
  value,
  message,
  showMessage,
}) => {
  return (
    <div className="input-container">
      <div className={`input-outline ${className}`}>
        {icon}

        <input
          type={type}
          placeholder={text}
          onChange={onchange}
          value={value}
        />
      </div>
      {showMessage && <p className="input-error-message"> {message} </p>}
    </div>
  );
};

export default Input;
