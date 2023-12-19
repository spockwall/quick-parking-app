import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { StyledMenu } from "./StyledMenu";

// Icons
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// route
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <button
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                }}
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="p-0 ml-2"
            >
                <MenuRoundedIcon sx={{ fontSize: "2.7rem", color: "#214F6D" }} />
            </button>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        navigate("/staff/profile");
                        handleClose();
                    }}
                    disableRipple
                    sx={{ my: 0.5 }}
                >
                    <PermIdentityRoundedIcon />
                    Profile
                </MenuItem>
                <Divider sx={{ borderColor: "#214F6D" }} />
                <MenuItem
                    onClick={() => {
                        navigate("/logout");
                    }}
                    disableRipple
                    sx={{ my: 0.5 }}
                >
                    <LogoutRoundedIcon className="scale-x-[-1]" />
                    Log Out
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
