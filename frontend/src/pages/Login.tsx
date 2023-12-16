import Logo from "../assets/logo.svg";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import useUserInfo from "../hooks/useUserInfo";
import { useCallback, useState } from "react";
import { LoginService } from "../services/loginService";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { commonButtonClass4 } from "../styles/commonStyles";
import { ROLE } from "../enums";

export default function Login(): JSX.Element {
    const { login } = useAuth("any");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { setUserInfo } = useUserInfo();
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role;

    const handleBack = useCallback(() => {
        navigate("/checkrole");
    }, [navigate]);

    const handleLogin = useCallback(async () => {
        // TODO: store to cookie
        const loginService = new LoginService();
        const userService = new UserService();
        const token = await loginService.login(id, password);

        if (token !== null) {
            const user = await userService.getUserInfo(id);
            const isFirstLogin = await loginService.checkFirstLogin(user);
            login(token, role);
            setUserInfo(user);
            // If first time login, redirect to register page,
            // or redirect to default page of the role
            if (role === ROLE.STAFF) {
                if (isFirstLogin) {
                    navigate("/register-staff", { state: { id } });
                } else {
                    navigate("/staff");
                }
            } else if (role === ROLE.GUARD) {
                if (isFirstLogin) {
                    navigate("/register-guard", { state: { id } });
                } else {
                    navigate("/guard");
                }
            } else if (role === ROLE.ADMIN) {
                navigate("/admin");
            }
        } else {
            window.alert("ID hasn't been registered or password is incorrect");
            handleBack();
        }
    }, [id, password, role, login, navigate, handleBack, setUserInfo]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}
        >
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
                            required
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
                            required
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
                            className={`${commonButtonClass4} bg-red hover:bg-red-dark focus:ring-red-dark text-sm md:text-lg`}
                            onClick={handleBack}
                        >
                            <ArrowBackIosRoundedIcon fontSize="small" className="mr-1" />
                            <span className="text-center ">Back</span>
                        </button>
                        <div className="w-5/12 flex justify-end">
                            <button
                                className={`${commonButtonClass4} bg-blue-dark hover:bg-blue-exdark focus:ring-blue-exdark`}
                            >
                                <span className="text-sm md:text-lg text-center">Log In</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
