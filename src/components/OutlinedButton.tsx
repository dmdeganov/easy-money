import React from 'react';
import {Button as MaterialButton, CircularProgress} from '@mui/material';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
}
export const OutlinedButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  type,
  loading,
  ...rest
}) => {
  return (
    <MaterialButton
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
      className={`button${className ? ` ${className}` : ''}`}
      endIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
      type={type}
    >
      {children}
    </MaterialButton>
  );
};

export default OutlinedButton;
