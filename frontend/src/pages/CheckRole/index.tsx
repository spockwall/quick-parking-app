import Logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import { ROLE } from "../../enums";
import { useNavigate } from "react-router-dom";
import { commonButtonClass2 } from "../../styles/commonStyles";
import type { roleType } from "../../types";

interface SelectRoleButtonProps {
    role: roleType;
    onClick: (role: roleType) => void;
}

const SelectRoleButton = (props: SelectRoleButtonProps) => {
    const role = props.role;
    return (
        <button type="button" onClick={() => props.onClick(role)} className={commonButtonClass2}>
            {role.toLocaleUpperCase()}
        </button>
    );
};

export default function CheckRole() {
    const { authState } = useAuth("any");
    const navigate = useNavigate();
    const handleButtonClick = (role: roleType) => {
        if (authState && authState?.role === role) {
            return navigate(`/${role}`);
        }
        return navigate(`/login/${role}`, { state: { role } });
    };
    return (
        <div
            className="bg-blue-light flex flex-col items-center align-middle justify-center"
            style={{ height: "100vh" }}
        >
            <div className="flex justify-center items-center text-center">
                <img className="w-20 h-20 sm:w-28 sm:h-28" src={Logo} alt="Quick Parking" />
                <div className="ml-3 sm:ml-6 md:ml-10 flex flex-col">
                    <div className="text-2xl sm:text-3xl md:text-4xl text-blue-dark font-bold flex justify-start">
                        Quick Parking
                    </div>
                    <div className="mt-2 text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">
                        Time saved daily.
                    </div>
                </div>
            </div>
            <div className="mb-6 mt-12 md:mt-8">
                <span className="text-2xl sm:text-3xl font-bold text-white">Who are you?</span>
            </div>

            <div className="flex flex-col items-center align-middle justify-center mt-3 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4">
                <SelectRoleButton role={ROLE.STAFF} onClick={handleButtonClick} />
                <SelectRoleButton role={ROLE.GUARD} onClick={handleButtonClick} />
                <SelectRoleButton role={ROLE.ADMIN} onClick={handleButtonClick} />
            </div>
        </div>
    );
}
