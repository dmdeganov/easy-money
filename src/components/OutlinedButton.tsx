import React from 'react';
import {Button as MaterialButton, CircularProgress} from '@mui/material';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  href?: string;
}
export const OutlinedButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  type,
  loading,
  href,
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
      href={href}
      sx={{
        fontFamily: `'SF Pro Text', sans-serif`,
        height: '36px',
        fontSize: '16px',
        fontWeight: 400,
        textTransform: 'none',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        color: 'var(--primary)',
        borderRadius: '10px',
        '&:hover': {
          background: '#fff',
          color: 'var(--surface)',
          borderColor: '#fff',
        },
      }}
    >
      {children}
    </MaterialButton>
  );
};

export default OutlinedButton;
