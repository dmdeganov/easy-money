import React from 'react';
import {TextField as MUITextField} from '@mui/material';
import {AnimatePresence, motion} from 'framer-motion';
import {root} from 'postcss';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  ref: null;
  type?: string;
  isValid?: boolean;
}

const TextField: React.FC<InputProps> = ({
  label,
  className = '',
  error = false,
  helperText = '',
  value,
  onChange,
  isValid,
  ...rest
}) => {
  return (
    <MUITextField
      error={error}
      helperText={
        <AnimatePresence>
          {helperText ? (
            <motion.div
              initial={{height: '0px'}}
              animate={{height: '16px', display: 'flex', alignItems: 'flex-end'}}
              style={{overflow: 'hidden'}}
              transition={{duration: 0.2}}
              exit={{height: '0px'}}
            >
              {helperText}
            </motion.div>
          ) : null}
        </AnimatePresence>
      }
      fullWidth
      className={className}
      sx={muiTextFieldFloatLabelSx}
      label={label}
      value={value}
      onChange={onChange}
      inputProps={{'aria-invalid': !isValid}}
      variant="standard"
      {...rest}
    />
  );
};

export default TextField;

export const muiTextFieldFloatLabelSx = {
  '&': {
    // minHeight: '85px',
  },
  '.MuiInputBase-root': {
    height: '62px',
    boxSizing: 'border-box',
  },
  'label + .MuiInputBase-root': {
    marginTop: 0,
  },
  '.MuiInputBase-input': {
    fontWeight: 'var(--regular)',
    fontSize: '20px',
    marginTop: '8px',
    fontFamily: `'SF Pro Text', sans-serif`,
  },
  '& label, & label.Mui-disabled ': {
    fontFamily: `'SF Pro Text', sans-serif`,
    lineHeight: 1,
    color: 'var(--on-surface-50)',
    fontSize: '14px',
  },
  '& label.Mui-focused': {
    // top: '0px',
    color: 'var(--on-surface)',
  },
  '& label.MuiInputLabel-shrink': {
    transform: 'translate(0, -1.5px)',
  },
  '& label.Mui-focused.Mui-error ': {
    color: 'var(--input-error)',
  },
  '& p.Mui-error': {
    fontSize: '12px',
  },
  '& label.MuiInputLabel-shrink + .MuiInputBase-root:not(.Mui-error):has(input[aria-invalid=false])::before': {
    borderColor: 'var(--primary)',
  },
  '& .MuiInputBase-root': {
    color: 'var(--on-surface)',
    '&::after, &::before, &:hover::after, &:hover::before': {
      borderWidth: 0,
      borderBottomWidth: '1px !important',
      borderStyle: 'solid',
      borderColor: 'var(--on-surface-50)',
    },
    '&:not(.Mui-disabled, .Mui-error)::before': {
      borderColor: 'var(--on-surface-50)',
    },
    '&:not(.Mui-focused):hover::before': {
      borderColor: 'var(--on-surface-70)',
    },
    '&.Mui-focused::after': {
      borderColor: 'var(--on-surface)',
    },
    '&.Mui-error::before': {
      borderColor: 'var(--input-error)',
    },
  },
  '.MuiInputBase-root.MuiInput-root.MuiInput-underline.Mui-disabled': {
    '&::before': {
      borderBottomColor: 'var(--primary)',
      borderBottomStyle: 'solid',
    },
  },
  '.MuiFormHelperText-root': {
    lineHeight: 1.2,
  },
};
