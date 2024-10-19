import React from 'react';
import './Button.css';

interface CustomtButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  bg_color: string;
}

const Button: React.FC<CustomtButtonInterface> = ({
  text,
  bg_color,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={onchange ? `btn disable ` : `btn ${bg_color}`}>
      {text}
    </button>
  );
};

export default Button;
