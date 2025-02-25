import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import {
    addDoc,
    getDoc,
    collection,
    doc,
    serverTimestamp
} from 'firebase/firestore'
import {
    Box,
    Button,
    TextField
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

interface NewMessageInputProps {
    channel: string | null
}

const NewMessageInput: React.FC<NewMessageInputProps> = ({channel}) => {
    const [newMessage, setNewMessage] = useState('')

    const sendMessage = async () => {
        if (newMessage.trim() === '') return
        const user = auth.currentUser

        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            const DisplayName = userDoc.data()?.displayName || 'Anonymous'

            await addDoc(collection(db, `channels/${channel}/messages`), {
                text: newMessage,
                senderId: user.uid,
                senderName: DisplayName,
                timestamp: serverTimestamp()
            })
            setNewMessage('')
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, backgroundColor: 'background.paper', borderRadius: 1}}>
            <TextField
                fullWidth
                variant='outlined'
                label='New Message'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') sendMessage();
                }}
            />
            <Button
                variant='contained'
                color='primary'
                startIcon={<SendIcon />}
                onClick={sendMessage}
                disabled={newMessage.trim() === ''}
                sx={{
                    paddingInline: 3
                }}
            >Send</Button>
        </Box>
    )
}

export default NewMessageInput