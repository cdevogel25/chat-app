import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/auth'
import Chat from './components/chat'
import { auth } from './firebase'
// import logo from './logo.svg';
import './App.css';

function App() {
    const [user, setUser] = useState(auth.currentUser)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })
        return () => unsubscribe()
    }, [])

    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={user ? <Chat /> : <Auth />}
                />
                <Route
                    path='/chat'
                    element={user ? <Chat /> : <Auth />}
                />
            </Routes>
        </Router>
    )
}

export default App;
