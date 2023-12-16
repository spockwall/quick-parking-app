import Button from "../../../components/Button";
import useUserInfo from "../../../hooks/useUserInfo";
import useAuth from "../../../hooks/useAuth";
import InputField from "../../../components/InputField";
import InputLPN from "../../../components/InputLPN";
import { useState } from "react";
import { ROLE } from "../../../enums";
import { UserService } from "../../../services/userService";

export default function Profile(): JSX.Element {
    useAuth(ROLE.STAFF);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const { userInfo, setUserInfo } = useUserInfo();
    console.log(userInfo);
    return (
        <>
            <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 flex flex-col m-auto mt-8 sm:mt-3">
                <form
                    onSubmit={async () => {
                        setDisabled(true);
                        userInfo.password = password;
                        const userService = new UserService();
                        const success = await userService.updateUserInfo(userInfo);
                        console.log(success);
                        if (!success) {
                            alert("Update failed");
                            return;
                        }
                        setUserInfo(userInfo);
                    }}
                >
                    <div>
                        <InputField title="Your ID" value={userInfo.userId} disabled />
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <InputField
                            title="Your Name"
                            value={userInfo.name}
                            disabled={disabled}
                            onChange={(e) => {
                                setUserInfo({ ...userInfo, name: e.target.value });
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <InputField
                            title="Phone Number"
                            value={userInfo.phone}
                            disabled={disabled}
                            onChange={(e) => {
                                setUserInfo({ ...userInfo, phone: e.target.value });
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <InputField
                            title="Email Address"
                            value={userInfo.email}
                            disabled={disabled}
                            onChange={(e) => {
                                setUserInfo({ ...userInfo, email: e.target.value });
                            }}
                        />
                    </div>

                    <div className="mt-2 sm:mt-0">
                        <InputLPN
                            title="License Plate Number"
                            value={userInfo.licensePlateNumbers}
                            disabled={disabled}
                            action={(newLPN: string) => {
                                setUserInfo({
                                    ...userInfo,
                                    licensePlateNumbers: [...userInfo.licensePlateNumbers, newLPN],
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
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
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
