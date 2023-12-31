import InputField from "../components/InputField";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import useAuth from "../hooks/useAuth";
import { ROLE } from "../enums";
import { useState } from "react";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const commonButtonClass =
    "text-white focus:outline-none rounded-full text-sm md:text-lg px-5 md:px-8 py-2.5 text-center flex items-center justify-center align-middle shadow-md";

export default function RegisterStaff(): JSX.Element {
    useAuth(ROLE.STAFF);
    const location = useLocation();
    const id = location.state?.id;

    const [name, setName] = useState("");
    const [carId, setCarId] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        // TODO: handle register
        const registerService = new UserService();
        const success = await registerService.registerStaff(id, name, carId, phone, email, password);

        if (success) {
            // redirect to default page
            navigate("/staff");
        } else {
            window.alert("Register failed");
            window.location.reload();
        }
    };

    const handleBack = () => {
        navigate("/login", { state: { role: ROLE.STAFF } });
    };

    return (
        <div className="flex flex-col justify-center items-center align-middle h-screen bg-blue-light">
            {/* Log In */}
            <div className="flex flex-col items-center text-white text-2xl sm:text-3xl">
                <div className="flex items-center font-bold">Register</div>
            </div>

            {/* Info */}
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex flex-col mt-1">
                <div className="w-10/12 flex flex-col m-auto">
                    <InputField
                        title="Your ID"
                        value={id}
                        readOnly={true}
                        className="px-1 py-0.5 border bg-gray border-blue bg-gray-200 rounded-md grow"
                    />
                </div>
                <div className="w-10/12 flex flex-col m-auto mt-1">
                    <InputField
                        title="Your Name"
                        value={name}
                        type="text"
                        placeholder="Alice"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="w-10/12 flex flex-col mt-1 m-auto">
                    <InputField
                        title="License Plate Number"
                        value={carId}
                        type="text"
                        placeholder="CAT-7777"
                        onChange={(e) => {
                            setCarId(e.target.value);
                        }}
                    />
                </div>
                <div className="w-10/12 flex flex-col mt-1 m-auto">
                    <InputField
                        title="Phone Number"
                        value={phone}
                        type="text"
                        placeholder="0912345678"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                </div>
                <div className="w-10/12 flex flex-col mt-1 m-auto">
                    <InputField
                        title="Email Address"
                        value={email}
                        type="text"
                        placeholder="XXX@gmail.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="w-10/12 flex flex-col mt-1 m-auto">
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
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 flex flex-col mt-6 sm:mt-4">
                <div className="w-10/12 flex m-auto justify-between mt-2">
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
