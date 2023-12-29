import React from 'react';
import {TextField as MUITextField} from '@mui/material';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  ref: null;
  type?: string;
}

const TextField: React.FC<InputProps> = ({
  label,
  className = '',
  error = false,
  helperText = '',
  value,
  onChange,
  type,
}) => {
  return (
    <MUITextField
      error={error}
      helperText={helperText}
      fullWidth
      className={className}
      sx={muiTextFieldFloatLabelSx}
      label={label}
      value={value}
      onChange={onChange}
      variant="standard"
      type={type || 'text'}
    />
  );
};

export default TextField;

export const muiTextFieldFloatLabelSx = {
  '&': {
  },
  '.MuiInputBase-root': {
    height: '64px',
    boxSizing: 'border-box',
  },
  'label + .MuiInputBase-root': {
    marginTop: 0,
  },
  '.MuiInputBase-input': {
    fontWeight: 'var(--regular)',
    fontSize: '16px',
  },
  '& label, & label.Mui-disabled ': {
    lineHeight: 1,
    color: 'var(--on-surface-50)',
    fontSize: '16px',
  },
  '& label.Mui-focused': {
    // top: '0px',
    color: 'var(--on-surface)',
  },
  '& label.MuiInputLabel-shrink': {
    transform: 'translate(0, -1.5px) scale(0.85)',
  },
  '& label.Mui-focused.Mui-error ': {
    color: '#d32f2f',
  },
  '& p.Mui-error': {
    fontSize: '12px',
  },
  '& label.MuiInputLabel-shrink + .MuiInputBase-root::before': {
    borderBottom: '1px solid var(--primary) !important',
  },
  '& .MuiInputBase-formControl': {
    color: 'var(--on-surface)',
    '.MuiInputBase-input.Mui-disabled': {
      color: 'var(--on-surface)',
      WebkitTextFillColor: 'var(--on-surface)',
    },
    '&::after': {
      borderBottomWidth: '1px',
    },
    '&:not(.Mui-disabled, .Mui-error)::before': {
      borderBottom: '1px solid var(--on-surface-50)',
    },
    '&:not(.Mui-disabled, .Mui-error)::after': {
      borderBottom: '1px solid var(--primary)',
    },
    '&:hover:not(.Mui-disabled, .Mui-error):before': {
      // borderBottom: '1px solid var(--on-surface)',
      borderBottom: '1px solid var(--on-surface)',
    },
  },
  '.MuiInputBase-root.MuiInput-root.MuiInput-underline.Mui-disabled': {
    '&::before': {
      borderBottomColor: 'var(--primary)',
      borderBottomStyle: 'solid',
    },
  },
};

