import { HashRouter, Routes, Route , Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { authCheck } from '../serviceLayer/authApi.js'
import Layout from './Layout.jsx'
import TempPage from './TempPage.jsx'
import ProtectedLogin from './ProtectedLogin.jsx'
import NotFound from './NotFound.jsx'
import MyProfilePage from './MyProfilePage.jsx';
import Register from './Register.jsx'
import OneAlbum from './OneAlbum.jsx';
import {PlayerProvider} from './OneAlbum.jsx'
import Album from './Album.jsx'
import UserProfile from './UserProfile.jsx';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                setLoading(true);
                const authStatus = await authCheck();
                setIsAuthenticated(authStatus);
            } catch (error) {
                console.error('Verification error:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <HashRouter>
        <PlayerProvider>
        <Routes >
            <Route path="/login" element={<ProtectedLogin isNotAuthenticated={!isAuthenticated}><Login /></ProtectedLogin>}/>
            <Route path="/register"element={<ProtectedLogin isNotAuthenticated={!isAuthenticated}><Register /></ProtectedLogin>}/>
            <Route element = {<ProtectedRoute isAuthenticated={isAuthenticated}><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Album />} />
                        <Route path="/albums/search/" element={<Album/>}/>
                        <Route path="/recent" element={<Album />} />
                        <Route path="/albums/search/:searchQuery" element={<Album />} />
                        <Route path="/album/:id" element={<OneAlbum />} />
                        <Route path="/users/:id" element={<UserProfile />} />
                        <Route path="/myprofile" element={<MyProfilePage />} />
                        <Route path="*" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Route>
          
            
        </Routes>
        </PlayerProvider>
        
    </HashRouter>
    );
}

export default App;

