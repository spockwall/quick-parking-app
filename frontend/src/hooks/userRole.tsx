import { useState, useEffect } from "react";
import type { roleType } from "../types";

export default function useRole(defaultRole?: roleType) {
    const [role, setRole] = useState<roleType>(defaultRole ?? "staff");
    
    useEffect(() => {
        if (!role) {
            setRole("staff");
        }
    }, [role]);
    return { role, setRole };
}
