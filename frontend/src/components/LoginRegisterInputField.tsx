import Input from "@mui/material/Input";

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
      {props.title && <label className="pb-1 text-blue-dark font-semibold">{props.title}</label>}
      <Input
        value={props.value ?? ""}
        className={props.className ?? "p-1.5 border bg-white border-blue rounded-md grow"}
        type={props.type ?? "text"}
        placeholder={props.placeholder ?? ""}
        disabled={props.disabled || props.readOnly ? true : false}
        required={props.required ?? false}
        readOnly={props.readOnly ?? false}
        onChange={props.onChange}
      />
    </div>
  );
}