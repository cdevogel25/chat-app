import {
    List,
    ListItemText,
    Box,
    Typography,
    ListItem,
    IconButton
} from "@mui/material"
import { collection, onSnapshot, query } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../../firebase"

interface Channel {
    id: string
}

const Channels: React.FC<Channel> = (channel) => {
    const [availableChannels, setAvailableChannels] = useState<Array<any>>([])

    useEffect(() => {
        const q = query(collection(db, 'channels'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const channels: Array<any> = []
            querySnapshot.forEach((doc) => {
                channels.push({ id: doc.id, ...doc.data() })
            })
            setAvailableChannels(channels)
        })
        return () => unsubscribe()
    }, [])
    
    return (
        <Box sx={{ pt: '64px', width: 250, bgcolor: 'background.paper', p: 2 }}>
            <Typography variant='h6' sx={{ mt: 8, mb: 2}}>Channels</Typography>
            <List>
                {availableChannels.map((channel) => (
                    <ListItem
                        key={channel.id}
                    >
                        <ListItemText primary={channel.Name} />
                        <IconButton color='inherit'>
                            {/* <EastIcon onClick={handleSelectChannel(channel.id)}/> */}
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export { Channels }