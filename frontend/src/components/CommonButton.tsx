import { styled } from "@mui/material/styles";
import MUIButton from "@mui/material/Button";

interface CommonButtonProps {
    bgColor?: string;
}

export const CommonButton = styled(MUIButton) <CommonButtonProps>`
    text-transform: none;
    font-size: 16px;
    padding: 8px 10px;
    border: 2px solid;
    border-radius: 12px;
    line-height: 1;
    background-color: ${(props) => props.bgColor || "#ffffff"};
    border-color: #3b88c3;
    &:hover {
        border-color: blue-dark;
        background-color: ${(props) => props.bgColor || "#ffffff"};
        box-shadow: 0 0 0 0.1rem #3b88c3;
    }
    &:focus {
        box-shadow: 0 0 0 0.1rem #3b88c3;
    }
    font-family: "Lexend", sans-serif;
`;

