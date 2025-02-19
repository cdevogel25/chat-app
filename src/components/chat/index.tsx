import { useState } from "react";
import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc
} from 'firebase/firestore'

import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { updateUserStatus } from '../auth/status'
import {
    Box,
    Typography,
    TextField,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import Sidebar from '../sidebar'
import { MessageBox } from "./messageBox";

const Chat = () => {
    const [newMessage, setNewMessage] = useState('')

    const sendMessage = async () => {
        if (newMessage.trim() === '') return
        const user = auth.currentUser

        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            const DisplayName = userDoc.data()?.displayName || 'Anonymous'

            await addDoc(collection(db, 'messages'), {
                text: newMessage,
                senderId: user.uid,
                senderName: DisplayName,
                timestamp: serverTimestamp()
            })
            setNewMessage('')
        }
    }

    const handleLogout = async () => {
            try {
                await updateUserStatus(false)
                await(signOut(auth))
                console.log('User logged out')
                window.location.href = '/'
            } catch (error) {
                console.error('Error logging out:', error)
            }
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Drawer
                variant='permanent'
                sx={{
                    width: 250,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box'
                    }
                }}
            >
                <Sidebar />
            </Drawer>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                            Chat App
                        </Typography>
                        <IconButton color='inherit' onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {/* Chat */}
                <MessageBox />
                
                <Box sx={{ display: 'flex', gap: 2, mt: 2}}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='Message...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={sendMessage}
                        disabled={newMessage.trim() === ''}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Chat