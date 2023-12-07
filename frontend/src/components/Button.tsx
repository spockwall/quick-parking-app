type buttonProps = {
  children?: string | JSX.Element;
  type?: "button" | "submit" | "reset";
  style?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function Button(props: buttonProps): JSX.Element {
  const defaultColor = props.color ?? "bg-blue-dark";
  const defaultHover = (defaultColor == 'bg-blue-dark'? 'hover:bg-blue-exdark focus:ring-blue-exdark' : 'hover:bg-blue-light-dark focus:ring-blue-light-dark');
  const defaultStyle = `${defaultColor} text-white font-semibold rounded-3xl shadow-gray shadow-md p-2 pr-8 pl-8 ${defaultHover}`;
  return (
    <button
      className={props.style ?? defaultStyle}
      type={props.type ?? "button"}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {props.children}
    </button>
  );
}