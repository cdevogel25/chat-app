import { useEffect, useRef, useState } from 'react'
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore'
import { Box, List, ListItemText, Divider, Grid2, Typography } from '@mui/material'
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
                mt: 6,
            }}
        >
            <List>
                {messages.map((msg) => (
                    <Box key={msg.id} >
                        <Grid2 container justifyContent='space-between' alignItems='center'
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    borderRadius: 1,
                                    borderLeft: '4px solid',
                                    borderColor: 'primary.main',
                                    transform: 'scale(1.01)',
                                },
                                transition: 'background-color 0.2s ease',
                            }}
                        >
                            <Grid2>
                                <ListItemText sx={{ paddingLeft: 2}}
                                    primary={msg.text}
                                    secondary={msg.senderName}
                                />
                            </Grid2>
                            <Grid2>
                                <Typography variant='body2' sx={{ paddingRight: 2}}>
                                    {new Date(msg.timestamp?.toDate()).toLocaleString()}
                                </Typography>
                            </Grid2>
                        </Grid2>
                        <Divider />
                    </Box>
                ))}
                {/* empty div to scroll into view */}
                <div ref={messagesEndRef} />
            </List>
        </Box>
    )
}

export default MessageBox