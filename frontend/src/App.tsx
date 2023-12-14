import Home from "./pages/Home.tsx";
import Staff from "./pages/Staff/index.tsx";
import Guard from "./pages/Guard/index.tsx";
import RegisterStaff from "./pages/RegisterStaff.tsx";
import RegisterGuard from "./pages/RegisterGuard.tsx";
import CheckRole from "./pages/CheckRole/index.tsx";
import Login from "./pages/Login.tsx";
import Logout from "./pages/Logout/index.tsx";
import AddUser from "./pages/AddUser.tsx";
import { Route, Routes } from "react-router-dom";
import { UserService } from "./services/userService.ts";
import { ROLE } from "./enums.ts";

export default function App() {
    return (
        <div id="body">
            <button
                onClick={async () => {
                    // admin: QL7522, 98zeEBVORKx
                    // staff: IH5087, 7bycNcLC5Q"
                    const userService = new UserService();
                    const res = await userService.createUser("IH5087", "7bycNcLC5Q", ROLE.STAFF);
                    console.log(res);
                }}
            >
                Logout
            </button>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkrole" element={<CheckRole />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/guard/*" element={<Guard />} />

                <Route path={"/login/*"} element={<Login />}></Route>
                <Route path={"/register-staff"} element={<RegisterStaff />}></Route>
                <Route path={"/register-guard"} element={<RegisterGuard />}></Route>
                <Route path={"/admin"} element={<AddUser />}></Route>

                <Route path="/staff/*" element={<Staff />} />
            </Routes>
        </div>
    );
}
