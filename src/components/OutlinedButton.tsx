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
      sx={{
        fontFamily: `'SF Pro Text', sans-serif`,

        fontSize: '16px',
        fontWeight: 400,
        textTransform: 'none',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        color: '#e3fd52',
        borderRadius: '10px',
        '&:hover': {
          background: '#fff',
          color: '#0C0B0C',
          borderColor: '#fff',
        },
      }}
    >
      {children}
    </MaterialButton>
  );
};

export default OutlinedButton;
