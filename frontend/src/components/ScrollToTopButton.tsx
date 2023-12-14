import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";

export default function ScrollToTopButton() {
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrolledDown = window.scrollY > 25;
            setIsScrolledDown(scrolledDown);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <IconButton
            sx={{ color: "#214F6D" }}
            aria-label="scroll-to-top"
            onClick={handleScrollToTop}
            style={{
                display: isScrolledDown ? "block" : "none",
            }}
        >
            <ArrowCircleUpRoundedIcon
                sx={{
                    fontSize: 40,
                    bottom: "20px",
                    right: "100px",
                    position: "fixed",
                    "@media (max-width: 600px)": {
                        fontSize: 28,
                        right: "12px",
                    },
                }}
            />
        </IconButton>
    );
}
