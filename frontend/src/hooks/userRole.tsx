import { useState, useEffect } from "react";
import { ROLE } from "../enums";
import type { roleType } from "../types";

export default function useRole(defaultRole?: roleType) {
    const [role, setRole] = useState<roleType>(defaultRole ?? ROLE.STAFF);
    
    useEffect(() => {
        if (!role) {
            setRole(ROLE.STAFF);
        }
    }, [role]);
    return { role, setRole };
}
