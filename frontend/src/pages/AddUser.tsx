import InputField from "../components/InputField";
import SuccessModal from "../components/modals/SuccessModal";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import useRole from "../hooks/userRole";
import { useState } from "react";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router-dom";

const commonButtonClass =
    "text-white focus:outline-none rounded-full text-sm md:text-lg px-5 md:px-8 py-2.5 text-center flex items-center justify-center align-middle font-bold";

export default function AddUser(): JSX.Element {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { role, setRole } = useRole(); // role:
    const navigate = useNavigate();

    const handleAdd = () => {
        const addUserService = new UserService();
        const addUser = addUserService.addUser(id, password, role);
        if (addUser === true) {
            setShowModal(true);
        } else {
            window.alert("Add user failed");
            window.location.reload();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-blue-light">
            {/* Add User */}
            <div className="flex flex-col items-center text-white text-3xl sm:text-4xl">
                <div className="flex items-center font-bold">
                    Add User
                    <PersonAddAlt1RoundedIcon className="ml-2" sx={{ fontSize: 36 }} />
                </div>
            </div>

            {/* Role */}
            <div className="w-10/12 sm:w-3/5 flex flex-col pb-1 text-blue-dark font-semibold mt-8">
                <div className="w-10/12 flex flex-col mt-1 m-auto">User</div>
                <div className="w-10/12 flex m-auto justify-between mt-2">
                    <div className="">
                        <button
                            className={`${commonButtonClass}focus:ring-yellow-dark ${
                                role === "staff"
                                    ? "bg-yellow-dark text-white"
                                    : "bg-transparent   hover:bg-yellow  text-white"
                            }`}
                            onClick={() => setRole("staff")}
                        >
                            Car Owner
                        </button>
                    </div>
                    <span className="font-semibold text-center flex items-center">or</span>
                    <div className="flex justify-end">
                        <button
                            className={`${commonButtonClass} focus:ring-yellow-dark ${
                                role === "guard"
                                    ? "bg-yellow-dark text-white"
                                    : "bg-transparent   hover:bg-yellow  text-white"
                            }`}
                            onClick={() => setRole("guard")}
                        >
                            Guard
                        </button>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="w-10/12 sm:w-3/5 flex flex-col mt-4">
                <div className="w-10/12 flex flex-col mt-1 m-auto">
                    <InputField
                        title="User ID"
                        value={id}
                        type="text"
                        placeholder="Alice"
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </div>
                <div className="w-10/12 flex flex-col mt-5 m-auto">
                    <InputField
                        title="Password"
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
            <div className="w-10/12 sm:w-3/5 flex flex-col mt-12">
                <div className="w-10/12 flex m-auto justify-between">
                    <div className="">
                        <button
                            type="button"
                            onClick={() => navigate("/logout")}
                            className={`${commonButtonClass} bg-red hover:bg-red-dark focus:ring-red-dark text-sm md:text-lg`}
                        >
                            <LogoutRoundedIcon className="scale-x-[-1] mr-1" />
                            <span className="text-center ">Log Out</span>
                        </button>
                    </div>
                    <div className="">
                        <button
                            type="button"
                            onClick={handleAdd}
                            className={`${commonButtonClass} bg-blue-dark hover:bg-blue-exdark focus:ring-blue-exdark text-sm md:text-lg`}
                        >
                            <span className="mr-1 text-center">Add</span>
                        </button>
                    </div>
                </div>
            </div>
            <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}
