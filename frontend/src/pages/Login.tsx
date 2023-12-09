import { useState } from "react";
import InputField from "../components/InputField";
import { LoginService } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Logo from "../assets/logo.svg";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const commonButtonClass =
    "text-white focus:outline-none focus:ring-2 rounded-full text-sm md:text-lg px-5 md:px-8 py-2.5 text-center flex items-center justify-center align-middle";

export default function Login(): JSX.Element {
    const location = useLocation();

    const role = location.state?.role;
    // const role = 'staff';

    const { login } = useAuth();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(" ");
    const navigate = useNavigate();

    const handleLogin = () => {
        const loginService = new LoginService();
        const [islogin, token] = loginService.login(id, password, role) as [boolean, string];

        if (islogin === true) {
            const first = loginService.checkFirstLogin(id);
            login(token, role);
            if (role === "staff") {
                if (first === true) {
                    // redirect to register page
                    navigate("/register-car-owner", { state: { id: id } });
                } else {
                    // redirect to default page of car owner
                    navigate("/staff");
                }
            } else if (role === "guard") {
                if (first === true) {
                    // redirect to register page
                    navigate("/register-guard", { state: { id: id } });
                } else {
                    // redirect to default page of guard
                    navigate("/guard");
                }
            } else if (role === "admin") {
                navigate("/admin");
            }
        } else {
            setLoginFail("ID hasn't been registered or password is incorrect");
        }
    };

    const handleBack = () => {
        navigate("/checkrole");
    };

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

            {/* Login Failed */}
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex items-center justify-center text-red-600 text-sm font-bold mt-2">
                {loginFail}
            </div>

            {/* Button */}
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex flex-col mt-12">
                <div className="w-10/12 flex m-auto justify-between">
                    <button
                        type="button"
                        className={`
        ${commonButtonClass} bg-red hover:bg-red-dark focus:ring-red-dark
      text-sm md:text-lg`}
                        onClick={handleBack}
                    >
                        <ArrowBackIosRoundedIcon fontSize="small" className="mr-1" />
                        <span className="text-center ">Back</span>
                    </button>
                    <div className="w-5/12 flex justify-end">
                        <button
                            type="button"
                            className={`
        ${commonButtonClass} bg-blue-dark hover:bg-blue-exdark focus:ring-blue-exdark
      `}
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
