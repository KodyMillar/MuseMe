import React from 'react';
import {
    Routes,
    Route,
    useLocation
} from 'react-router-dom';
import Navbar from '../components/layout/navigation/Navbar/Navbar';
import Home from '../pages';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Buy from '../pages/purchases/Buy';
import PurchaseBook from '../pages/purchases/PurchaseBook';
import PurchaseComplete from '../pages/purchases/PurchaseComplete';
import Play from '../pages/play/Play';
import MyProgress from '../pages/progress/MyProgress';
import FilteredSongs from '../pages/play/FilteredSongs';

function Layout() {
    const location = useLocation();
    
    const excludedNavbarPages = ['/auth/login', '/auth/register'];
    return (
        <>
            {!excludedNavbarPages.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/buy/purchase/:bookId" element={<PurchaseBook />} />
                <Route path="/buy/purchase-complete/:bookId" element={<PurchaseComplete />} />
                <Route path="/play" element={<Play />} />
                <Route path="/play/search/song-progress/:userId" element={<FilteredSongs />} />
                <Route path="/my-progress" element={<MyProgress />}></Route>
            </Routes>
        </>
    );
}

export default Layout;