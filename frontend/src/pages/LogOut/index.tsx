import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../../services/loginService";

export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth("any");

    useEffect(() => {
        const loginService = new LoginService();
        const animationTimeout = setTimeout(() => {
            navigate("/checkrole");
        }, 2000);
        logout();
        loginService.logout();
        return () => clearTimeout(animationTimeout);
    }, [navigate, logout]);

    return (
        <div>
            <div
                className="bg-blue-light flex flex-col items-center align-middle justify-center"
                style={{ height: "100vh" }}
            >
                <div className="items-center text-center mb-20">
                    <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">See You Next Time.</span>
                </div>
                <div className="flex sm:flex-row flex-col justify-center items-center text-center sm:mb-16">
                    <img className="w-28 h-28 sm:w-32 sm:h-32" src="/logo.svg" alt="Quick Parking" />
                    <div className="mt-2 sm:mt-0 sm:ml-4 flex flex-col">
                        <div className="mt-3 sm:mt-0 text-2xl sm:text-4xl text-blue-dark font-bold flex justify-start">
                            Quick Parking
                        </div>
                        <div className="mt-2 text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">
                            Time saved daily.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
