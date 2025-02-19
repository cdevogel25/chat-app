import { useEffect, useRef, useState } from 'react'
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore'
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material'
import { db } from '../../firebase'

const MessageBox = () => {
    const [messages, setMessages] = useState<Array<any>>([])
    const messagesEndRef = useRef<HTMLDivElement | null>(null) // add a ref to the most recent message

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages: Array<any> = []
            querySnapshot.forEach((doc) => {
                messages.push({id: doc.id, ...doc.data()})
        })
        setMessages(messages)
    })
    return () => unsubscribe()
    }, [])

    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 2,
                bgcolor: 'background.paper',
            }}
        >
            <List>
                {messages.map((msg) => (
                    <Box key={msg.id}>
                        <ListItem>
                            <ListItemText
                                primary={msg.text}
                                secondary={msg.senderName}
                            />
                        </ListItem>
                        <Divider />
                    </Box>
                ))}
                {/* empty div to scroll into view */}
                <div ref={messagesEndRef} />
            </List>
        </Box>
    )
}

export { MessageBox }