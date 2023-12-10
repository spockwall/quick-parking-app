import { styled } from "@mui/material/styles";
import MUIButton from "@mui/material/Button";
export const CommonButton = styled(MUIButton)`
    text-transform: none;
    font-size: 16px;
    padding: 8px 10px;
    border: 2px solid;
    border-radius: 12px;
    line-height: 1;
    background-color: #ffffff;
    border-color: #3b88c3;
    &:hover {
        border-color: blue-dark;
        background-color: #ffffff;
        box-shadow: 0 0 0 0.1rem #3b88c3;
    }
    &:focus {
        box-shadow: 0 0 0 0.1rem #3b88c3;
    }
    font-family: "Lexend", sans-serif;
`;
