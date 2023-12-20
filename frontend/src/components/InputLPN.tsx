import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";

type InputLPNProps = {
    title: string;
    value: string[];
    type?: string;
    required?: boolean;
    disabled?: boolean;
    action: (val: string) => void;
};

export default function InputLPN(props: InputLPNProps) {
    const [numAdded, setNumAdded] = useState<number>(0);
    const [newLPN, setNewLPN] = useState<string>("");
    const disabled = props.disabled ?? false;
    const textStyle = "pb-1 text-blue-dark text-sm font-semibold";
    const disabledStyle = props.disabled ? "opacity-50 cursor-not-allowed" : "";
    return (
        <>
            <div className="flex flex-col mt-2">
                <label className={textStyle}>{props.title}</label>
                {props.value?.map((lPN: string, index) => {
                    return <BootstrapInput key={index} value={lPN} className="mb-1" readOnly disabled />;
                })}
                <BootstrapInput
                    className={`${disabledStyle}`}
                    value={newLPN}
                    onChange={(e) => {
                        setNewLPN(e.target.value);
                    }}
                    disabled={disabled}
                />
                <button
                    type="button"
                    className={`ml-auto ${textStyle} ${disabled && disabledStyle}}`}
                    disabled={disabled}
                    onClick={() => {
                        if (newLPN === "") return;
                        props?.action(newLPN);
                        setNewLPN("");
                        setNumAdded(numAdded + 1);
                    }}
                >
                    + Add New One
                </button>
            </div>
        </>
    );
}

const BootstrapInput = styled(InputBase)(({ theme, disabled }) => ({
    "label + &": {
        marginTop: theme.spacing(0),
    },
    "& .MuiInputBase-input": {
        fontFamily: ["Lexend", "sans-serif"].join(","),
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
        border: "2px solid",
        borderColor: theme.palette.mode === "light" ? "#3B88C3" : "#214F6D",
        ...(disabled && {
            backgroundColor: "#D9D9D9",
        }),
        fontSize: 16,
        padding: "6px 10px",
        margin: "",
        transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
        "&:focus": {
            boxShadow: `${alpha("#2770A8", 0.25)} 0 0 0 0.2rem`,
            borderColor: "#2770A8",
            fontSize: 17,
        },
    },
}));
