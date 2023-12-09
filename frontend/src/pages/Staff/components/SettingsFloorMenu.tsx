import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const options = ["3 F", "2 F", "1 F", "B1 F", "B2 F", "B3 F"];
// TODO: should be refactored withsetting Floor Menu
export default function SettingsFloorMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: "background.paper" }}>
                <ListItem
                    id="button"
                    aria-haspopup="listbox"
                    aria-controls="menu"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickListItem}
                    sx={{
                        color: "black",
                        background: "white",
                        textAlign: "center",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 2px 0.03rem #3B88C3",
                        paddingBottom: "12px",
                        paddingTop: "12px",
                        border: 2,
                        borderColor: "#3B88C3",
                        fontWeight: "bold",
                        fontSize: 14,
                        "&:hover": {
                            boxShadow: "0px 0px 5px 0.05rem #3B88C3",
                        },
                    }}
                >
                    <ListItemText primary={options[selectedIndex]} sx={{ margin: "0 2px 0 2px" }} />
                    <KeyboardArrowDownIcon />
                </ListItem>
            </List>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "button",
                    role: "listbox",
                }}
                sx={{ width: 1 }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        // disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
