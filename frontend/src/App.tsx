import { Route, Routes } from 'react-router-dom';

import LogoAnimation from './components/LogoAnimation.tsx';
import CheckRole from './pages/CheckRole/index.tsx';
import LogOut from './pages/LogOut/index.tsx';
import Guard from './pages/Guard/index.tsx';

import Login from './pages/Login.tsx'
import RegisterCarOwner from './pages/RegisterCarOwner.tsx'
import RegisterGuard from './pages/RegisterGuard.tsx'
import AddUser from './pages/AddUser.tsx'

import Staff from './pages/Staff/index.tsx';

const Home = () => {
    return (
        <div>
            <LogoAnimation />
        </div>
    );
};


export default function App() {
    return (
        <div id="body">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkrole" element={<CheckRole />} /> 
                <Route path="/logout" element={<LogOut />} />
                <Route path="/guard/*" element={<Guard />} />

                <Route path={'/login/*'} element={<Login />} ></Route>
                <Route path={'/register-car-owner'} element={<RegisterCarOwner />} ></Route>
                <Route path={'/register-guard'} element={<RegisterGuard />} ></Route>
                <Route path={'/admin'} element={<AddUser />} ></Route>

                <Route path="/staff/*" element={<Staff />} />
            </Routes>
        </div>
    );
}