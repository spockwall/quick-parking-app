// import Input from "@mui/material/Input";
// import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';


const BootstrapInput = styled(InputBase)(({ theme, disabled }) => ({
  'label + &': {
    marginTop: theme.spacing(0),
  },
  '& .MuiInputBase-input': {    
    fontFamily: ['Lexend', 'sans-serif'].join(','),
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#FFFFFF',
    border: '2px solid',
    borderColor: theme.palette.mode === 'light' ? '#3B88C3' : '#214F6D',
    ...(disabled && {
      backgroundColor: '#D9D9D9', 
    }),
    fontSize: 16,
    // width: 'auto',
    padding: '6px 10px',
    margin: '0',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha('#214F6D', 0.25)} 0 0 0 0.2rem`,
      borderColor: '#214F6D',
      fontSize: 17,
    },
  },
}));


type LoginRegisterInputFieldProps = {
  title?: string;
  value?: string | number;
  type?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


export default function LoginRegisterInputField(props: LoginRegisterInputFieldProps) {
  return (
    <div className="flex flex-col">
      {/* {props.title && <label className="pb-1 text-blue-dark font-semibold">{props.title}</label>} */}

      {/* <Input
        value={props.value ?? ""}
        className={props.className ?? "px-1 py-0.5 border bg-white border-blue rounded-md grow"}
        type={props.type ?? "text"}
        placeholder={props.placeholder ?? ""}
        disabled={props.disabled || props.readOnly ? true : false}
        required={props.required ?? false}
        readOnly={props.readOnly ?? false}
        onChange={props.onChange}
      /> */}
      <Box
        component="form"
        sx={{
          '& > :not(style)': {  },
        }}
        noValidate
        autoComplete="off"
      >
        <InputLabel shrink htmlFor="bootstrap-input">
          {props.title ?? ""}
        </InputLabel>
        <BootstrapInput defaultValue="react-bootstrap"     id="bootstrap-input" 
          value={props.value ?? ""}
          // id="outlined-basic"
          // label={props.title ?? ""}
          // focused
          type={props.type ?? "text"}
          placeholder={props.placeholder ?? ""}
          disabled={props.disabled || props.readOnly ? true : false}
          required={props.required ?? false}
          readOnly={props.readOnly ?? false}
          onChange={props.onChange}
          // margin="dense"
          fullWidth
          />
      </Box>
    </div>
  );
}