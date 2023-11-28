// import {
//     // Navigate,
//     RouterProvider,
//     createBrowserRouter,
// } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogoAnimation from './components/LogoAnimation.tsx';
import CheckRole from './pages/CheckRole/index.tsx';
import LogOut from './pages/LogOut/index.tsx';
import Guard from './pages/Guard/index.tsx';

// yujie Part
import Login from './pages/Login.tsx'
import RegisterCarOwner from './pages/RegisterCarOwner.tsx'
import RegisterGuard from './pages/RegisterGuard.tsx'
import AddUser from './pages/AddUser.tsx'

// spockwall part
// import ParkingLot from "./components/ParkingLot";
// import NavBar from "./layout/navbar";
// import Profile from "./pages/Profile";


// localhost:3000/
const Home = () => {
    return (
        <div>
            <LogoAnimation />
        </div>
    );
};


export default function App() {
    return (
        <BrowserRouter>
            <div id="body">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/checkrole" element={<CheckRole />} /> 
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/guard/*" element={<Guard />} />

                    {/* yujie part */}
                    <Route path={'/login/*'} element={<Login />} ></Route>
                    {/* change route  */}
                    <Route path={'/register-car-owner'} element={<RegisterCarOwner />} ></Route>
                    <Route path={'/register-guard'} element={<RegisterGuard />} ></Route>
                    <Route path={'/admin'} element={<AddUser />} ></Route>

                    {/* spockwall part
                     <Route path="/parkinglot" element={<ParkingLot floor={1} slot={1} />} />

                    change route 

                    <Route path="/profile" element={<Profile />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}
// const router = createBrowserRouter([
//     {
//         path: '/',
//         Component: Home,
//         children: [
            
//         ],
//     },
// ]);
