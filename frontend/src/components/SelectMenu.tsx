import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styleBlue, styleWhite } from "../styles/selectMenuStyle.ts";
import { useState } from "react";

// TODO: pass states as arguements to change the floors and slots
interface SelectMenuProps {
    options: string[];
    style?: "white" | "blue";
    selectedIndex: number;
    onSelectedIndexChanged: (index: number) => void;
}
export default function SelectMenu(props: SelectMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const [selectedIndex, setSelectedIndex] = useState(1);
    const { options } = props;
    const open = Boolean(anchorEl);
    return (
        <div>
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: "background.paper" }}>
                <ListItem
                    id="button"
                    aria-haspopup="listbox"
                    aria-controls="menu"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                    }}
                    sx={props.style === "blue" ? styleWhite : styleBlue}
                >
                    <ListItemText primary={options[props.selectedIndex]} sx={{ margin: "0 2px 0 2px" }} />
                    <KeyboardArrowDownIcon />
                </ListItem>
            </List>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                    setAnchorEl(null);
                }}
                MenuListProps={{
                    "aria-labelledby": "button",
                    role: "listbox",
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        // disabled={index === 0}
                        selected={index === props.selectedIndex}
                        onClick={() => {
                            props.onSelectedIndexChanged(index);
                            setAnchorEl(null);
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

