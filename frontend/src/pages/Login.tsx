import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";
import { useCallback, useState } from "react";
import { LoginService } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import { ROLE } from "../enums";
import Logo from "../assets/logo.svg";

const commonButtonClass =
    "text-white focus:outline-none focus:ring-2 rounded-full text-sm md:text-lg px-5 md:px-8 py-2.5 text-center flex items-center justify-center align-middle";

export default function Login(): JSX.Element {
    const { login } = useAuth("any");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role;
    const handleBack = useCallback(() => {
        navigate("/checkrole");
    }, [navigate]);

    const handleLogin = useCallback(() => {
        // TODO: store to cookie
        const loginService = new LoginService();
        const [token, user] = loginService.login(id, password, role);
        console.log(user);

        if (token !== "") {
            const isFirstLogin = loginService.checkFirstLogin(id);
            // toast.success(`Welcome back, ${user.name}!`);
            login(token, role);
            if (role === ROLE.STAFF) {
                // If first time login, redirect to register page, or redirect to default page of car owner
                if (isFirstLogin) {
                    navigate("/register-staff", { state: { id } });
                } else {
                    navigate("/staff");
                }
            } else if (role === ROLE.GUARD) {
                // If first time login, redirect to register page, or redirect to default page of guard
                if (isFirstLogin) {
                    navigate("/register-guard", { state: { id } });
                } else {
                    navigate("/guard");
                }
            } else if (role === ROLE.ADMIN) {
                navigate("/admin");
            }
        } else {
            handleBack();
            // toast.error("ID hasn't been registered or password is incorrect");
        }
    }, [id, password, role, login, navigate, handleBack]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-blue-light">
            {/* Logo and Slogan */}
            <div className="flex justify-center items-center text-center">
                <img className="w-20 h-20 sm:w-28 sm:h-28" src={Logo} alt="Quick Parking" />
                <div className="ml-5 sm:ml-8 md:ml-10 flex flex-col">
                    <div className="text-xl sm:text-3xl md:text-4xl text-blue-dark font-bold flex justify-start">
                        Quick Parking
                    </div>
                    <div className="mt-2 text-md sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">
                        Time saved daily.
                    </div>
                </div>
            </div>

            {/* Log In */}
            <div className="flex flex-col items-center text-white text-3xl sm:text-4xl">
                <div className="flex items-center font-bold mt-8">Log In</div>
            </div>

            {/* Info */}
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex flex-col mt-6">
                <div className="w-10/12 flex flex-col mt-1 m-auto">
                    <InputField
                        title="Your ID"
                        value={id}
                        placeholder="B09902123"
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </div>
                <div className="w-10/12  flex flex-col mt-5 m-auto">
                    <InputField
                        title="Password"
                        value={password}
                        type="password"
                        placeholder="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            </div>

            {/* Button */}
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex flex-col mt-12">
                <div className="w-10/12 flex m-auto justify-between">
                    <button
                        type="button"
                        className={`${commonButtonClass} bg-red hover:bg-red-dark focus:ring-red-dark text-sm md:text-lg`}
                        onClick={handleBack}
                    >
                        <ArrowBackIosRoundedIcon fontSize="small" className="mr-1" />
                        <span className="text-center ">Back</span>
                    </button>
                    <div className="w-5/12 flex justify-end">
                        <button
                            type="button"
                            className={`${commonButtonClass} bg-blue-dark hover:bg-blue-exdark focus:ring-blue-exdark`}
                            onClick={handleLogin}
                        >
                            <span className="text-sm md:text-lg text-center">Log In</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
