import Button from "../../../components/Button";
import useUserInfo from "../../../hooks/useUserInfo";
import useAuth from "../../../hooks/useAuth";
import InputField from "../../../components/InputField";
import InputLPN from "../../../components/InputLPN";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ROLE } from "../../../enums";
import { UserService } from "../../../services/userService";
import { userInfo } from "@/types";
import "react-toastify/dist/ReactToastify.css";

export default function Profile(): JSX.Element {
    useAuth(ROLE.STAFF);
    const { userInfo, setUserInfo } = useUserInfo();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [newUserInfo, setNewUserInfo] = useState<userInfo>(userInfo);
    useEffect(() => {
        setNewUserInfo(userInfo);
    }, [userInfo]);
    return (
        <>
            <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 flex flex-col m-auto mt-8 sm:mt-3">
                <form
                    autoComplete="off"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setDisabled(true);
                        newUserInfo.password = password;
                        newUserInfo.licensePlates = newUserInfo.licensePlateNumbers;
                        const userService = new UserService();
                        const success = await userService.updateUserInfo(newUserInfo);
                        if (success) {
                            toast.success("Update successful!");
                            setUserInfo(newUserInfo);
                        } else toast.error("Update failed!");
                    }}
                >
                    <ToastContainer 
                        toastClassName="w-2/3 m-auto mt-3"
                        />
                    <div>
                        <InputField title="Your ID" value={newUserInfo.userId} disabled />
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <InputField
                            title="Your Name"
                            value={newUserInfo.name}
                            disabled={disabled}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, name: e.target.value });
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <InputField
                            title="Phone Number"
                            value={newUserInfo.phone}
                            disabled={disabled}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, phone: e.target.value });
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <InputField
                            title="Email Address"
                            value={newUserInfo.email}
                            disabled={disabled}
                            onChange={(e) => {
                                setNewUserInfo({ ...newUserInfo, email: e.target.value });
                            }}
                        />
                    </div>

                    <div className="mt-2 sm:mt-0">
                        <InputLPN
                            title="License Plate Number"
                            value={newUserInfo.licensePlateNumbers}
                            disabled={disabled}
                            action={(newLPN: string) => {
                                setNewUserInfo({
                                    ...userInfo,
                                    licensePlateNumbers: [...newUserInfo.licensePlateNumbers, newLPN],
                                });
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <InputField
                            title="Password"
                            value={password}
                            disabled={disabled}
                            type="password"
                            placeholder="Enter password to edit"
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>

                    <div
                        className={`flex flex-row ${
                            disabled ? "justify-center" : "justify-between"
                        } space-x-2 mt-4 sm:mt-3`}
                    >
                        <Button
                            color="bg-blue-light"
                            onClick={() => {
                                setDisabled(!disabled);
                            }}
                        >
                            {disabled ? "Edit" : "Cancel"}
                        </Button>
                        {!disabled && <Button type="submit">Save</Button>}
                    </div>
                </form>
            </div>
        </>
    );
}
