// import {
//     // Navigate,
//     RouterProvider,
//     createBrowserRouter,
// } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LogoAnimation from './components/LogoAnimation.tsx';
import CheckStatus from './pages/CheckStatus/index.tsx';
import LogOut from './pages/LogOut/index.tsx';
import Guard from './pages/Guard/index.tsx';

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
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkstatus" element={<CheckStatus />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/guard/*" element={<Guard />} />
            </Routes>
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
