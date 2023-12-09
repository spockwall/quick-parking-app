import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Icons
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// route
import { useNavigate } from "react-router-dom";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 160,
        color: theme.palette.mode === "light" ? "#214F6D" : "#1A3E55",
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 26,
                color: "#1A3E55",
                marginRight: theme.spacing(2.5),
                marginLeft: theme.spacing(1),
            },
            "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

export default function CustomizedMenus() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <button
                onClick={handleClick}
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                // disableElevation
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
                        navigate("/staff/settings");
                        handleClose();
                    }}
                    disableRipple
                    sx={{ my: 0.5 }}
                >
                    <SettingsOutlinedIcon />
                    Settings
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
