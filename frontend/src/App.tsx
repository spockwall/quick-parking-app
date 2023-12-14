import Home from './pages/Home.tsx';
import Staff from './pages/Staff/index.tsx';
import Guard from './pages/Guard/index.tsx';
import RegisterStaff from './pages/RegisterStaff.tsx';
import RegisterGuard from './pages/RegisterGuard.tsx'
import CheckRole from './pages/CheckRole/index.tsx';
import Login from './pages/Login.tsx'
import Logout from './pages/Logout/index.tsx';
import AddUser from './pages/AddUser.tsx'

import { Route, Routes } from 'react-router-dom';



export default function App() {
    return (
        <div id="body">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkrole" element={<CheckRole />} /> 
                <Route path="/logout" element={<Logout />} />
                <Route path="/guard/*" element={<Guard />} />

                <Route path={'/login/*'} element={<Login />} ></Route>
                <Route path={'/register-staff'} element={<RegisterStaff />} ></Route>
                <Route path={'/register-guard'} element={<RegisterGuard />} ></Route>
                <Route path={'/admin'} element={<AddUser />} ></Route>

                <Route path="/staff/*" element={<Staff />} />
            </Routes>
        </div>
    );
}