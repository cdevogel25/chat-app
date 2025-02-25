import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './components/auth'
import Chat from './components/chat'
import { auth } from './firebase'
// import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

function App() {
    const [user, setUser] = useState(auth.currentUser)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })
        return () => unsubscribe()
    }, [])
    //TODO: add a topbar toggle to swap themes
    return (
        <ThemeProvider theme={darkTheme} defaultMode='dark'>
            <CssBaseline />
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
        </ThemeProvider>
    )
}

export default App;
