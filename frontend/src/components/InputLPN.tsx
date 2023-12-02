import { useRef } from "react";

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

type InputLPNProps = {
  title: string;
  value: string[];
  type?: string;
  required?: boolean;
  disabled?: boolean;
  action: (val: string) => void;
};


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
    margin: '',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha('#2770A8', 0.25)} 0 0 0 0.2rem`,
      borderColor: '#2770A8',
      fontSize: 17,
    },
  },
}));


export default function InputLPN(props: InputLPNProps) {
  const disabled = props.disabled ?? false;
  const inputRef = useRef<HTMLInputElement>(null);
  // const inputStyle = "p-1 border-2 border-blue rounded";
  const textStyle = "pb-1 text-blue-dark text-sm font-semibold";
  const disabledStyle = props.disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <>
      <div className="flex flex-col mt-2">
        <label className={textStyle}>{props.title}</label>
        {props.value?.map((lPN: string) => {
          return <BootstrapInput key={lPN} value={lPN} className='mb-1' readOnly disabled/>;
        })}
        <BootstrapInput
          defaultValue=""
          className={`${disabledStyle}`}
          ref={inputRef}
          disabled={disabled}
        />
        <button
          className={`ml-auto ${textStyle} ${disabled && disabledStyle}}`}
          disabled={disabled}
          onClick={() => {
            props?.action(inputRef.current?.value ?? "");
            inputRef.current!.value = "";
          }}
        >
          + Add New One
        </button>
      </div>
    </>
  );
}