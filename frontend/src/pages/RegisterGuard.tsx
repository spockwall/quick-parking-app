import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useState } from "react";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ROLE } from "../enums";
import { commonButtonClass3 } from "../styles/commonStyles";

export default function RegisterGuard(): JSX.Element {
    useAuth(ROLE.GUARD);
    const location = useLocation();
    const id = location.state?.id;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        // TODO: handle register
        const registerService = new UserService();
        const register = registerService.registerGuard(id, name, password);

        if (register) {
            navigate("/guard");
        } else {
            // register failed...??
        }
    };

    const handleBack = () => {
        navigate("/login", { state: { role: "guard" } });
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-blue-light">
            {/* Log In */}
            <div className="flex flex-col items-center text-white text-3xl sm:text-4xl">
                <div className="flex items-center font-bold mt-4">Register</div>
            </div>

            {/* Info */}
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex flex-col mt-8">
                <div className="w-10/12 flex flex-col mt-1 m-auto">
                    <InputField
                        title="Your ID"
                        value={id}
                        readOnly={true}
                        className="px-1 py-0.5 border border-blue bg-gray rounded-md grow"
                    />
                </div>
                <div className="w-10/12 flex flex-col mt-5 m-auto">
                    <InputField
                        title="Your Name"
                        value={name}
                        type="text"
                        placeholder="Bob"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="w-10/12 flex flex-col mt-5 m-auto">
                    <InputField
                        title="New Password"
                        value={password}
                        type="password"
                        placeholder="new password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            </div>

            {/* Button */}
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex flex-col text-lg mt-12">
                <div className="w-10/12 flex m-auto justify-between">
                    <button
                        type="button"
                        className={`${commonButtonClass3} bg-red hover:bg-red-dark focus:ring-red-dark text-sm md:text-lg`}
                        onClick={handleBack}
                        // style={{ boxShadow: '1 1 8 0.1rem #D54D40' }}
                    >
                        <ArrowBackIosRoundedIcon fontSize="small" className="mr-1" />
                        <span className="text-center ">Back</span>
                    </button>
                    <div className="w-5/12 flex justify-end">
                        <button
                            type="button"
                            className={`${commonButtonClass3} bg-blue-dark hover:bg-blue-exdark focus:ring-blue-exdark`}
                            onClick={handleRegister}
                        >
                            <span className="text-sm md:text-lg text-center">Register</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
