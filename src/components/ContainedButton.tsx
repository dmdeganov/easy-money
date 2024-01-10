import React from 'react';
import {Button as MaterialButton, CircularProgress} from '@mui/material';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  href?: string;
}
export const ContainedButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  type,
  loading,
  href,
}) => {
  return (
    <MaterialButton
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      className={`button${className ? ` ${className}` : ''}`}
      endIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
      type={type}
      href={href}
      sx={{
        fontFamily: `'SF Pro Text', sans-serif`,
        fontSize: '16px',
        fontWeight: 500,
        padding: '16px 32px',
        textTransform: 'none',
        backgroundColor: 'var(--primary)',
        color: 'var(--surface)',
        borderRadius: '10px',
        '&:hover': {
          background: '#fff',
          color: '#0C0B0C',
        },
        '&:disabled': {
          background: '#2D2D2D',
          color: 'rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      {children}
    </MaterialButton>
  );
};

export default ContainedButton;
