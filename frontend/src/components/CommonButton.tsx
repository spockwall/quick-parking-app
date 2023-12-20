import { styled } from "@mui/material/styles";
import MUIButton from "@mui/material/Button";

interface CommonButtonProps {
    bgcolor?: string;
    bordercolor?: string;
}

export const CommonButton = styled(MUIButton) <CommonButtonProps>`
    text-transform: none;
    font-size: 16px;
    padding: 8px 10px;
    border: 2px solid;
    border-radius: 12px;
    line-height: 1;
    background-color: ${(props) => props.bgcolor || "#ffffff"};
    border-color: ${(props) => props.bordercolor || "#3b88c3"};
    &:hover {
        border-color: ${(props) => props.bordercolor || "#3b88c3"};
        background-color: ${(props) => props.bgcolor || "#ffffff"};
        box-shadow: 0 0 0 0.1rem ${(props) => props.bordercolor || "#3b88c3"}};
    }
    &:focus {
        box-shadow: 0 0 0 0.1rem ${(props) => props.bordercolor || "#3b88c3"};
    }
    font-family: "Lexend", sans-serif;
`;

